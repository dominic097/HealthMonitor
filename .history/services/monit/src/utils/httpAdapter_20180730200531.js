import { Error } from 'mongoose';

const http = require('http');
const https = require('https');
const url = require('url');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
function settle(resolve, reject, response) {
  if (typeof response.status !== 'undefined' && response.status <= 400) {
    resolve(response);
  } else {
    reject(new Error(
      `Request failed with status code ${response.status}`,
      response.config,
      null,
      response.request,
      response,
    ));
  }
}

module.exports = (config) => {
  return new Promise((resolve, reject) => {
    const headers = config.headers;
    let timer = null;
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'express/nodejs';
    }

    const parsed = url.parse(config.url);
    const protocol = parsed.protocol || 'http:';
    const isHttps = protocol === 'https:';
    const agent = isHttps ? config.httpsAgent : config.httpAgent;
    const options = {
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.path,
      method: config.method,
      headers,
      agent,
    };

    let transport = http;
    if (config.transport) {
      transport = config.transport;
    } else {
      transport = isHttps ? https : http;
    }

    // Create the request
    const req = transport.request(options, (res) => {
      if (req.aborted) return;

      // Response has been received so kill timer that handles request timeout
      clearTimeout(timer);
      timer = null;

      // uncompress the response body transparently if required
      let stream = res;
      switch (res.headers['content-encoding']) {
        /* eslint default-case:0 */
        case 'gzip':
        case 'compress':
        case 'deflate':
          // add the unzipper to the body stream processing pipeline
          stream = stream.pipe(zlib.createUnzip());

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
      }

      // return the last request in case of redirects
      const lastRequest = res.req || req;

      const response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config,
        request: lastRequest,
      };

      const responseBuffer = [];
      stream.on('data', (chunk) => {
        responseBuffer.push(chunk);

        // make sure the content length is not over the maxContentLength if specified
        if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
          reject(new Error(`maxContentLength size of ${config.maxContentLength} exceeded`));
        }
      });

      stream.on('error', (err) => {
        if (req.aborted) return;
        reject(new Error(err, config, null, lastRequest));
      });

      stream.on('end', () => {
        let responseData = Buffer.concat(responseBuffer);
        if (config.responseType !== 'arraybuffer') {
          responseData = responseData.toString('utf8');
        }

        response.data = responseData;
        settle(resolve, reject, response);
      });
    });

    // Handle errors
    req.on('error', (err) => {
      if (req.aborted) return;
      reject(new Error(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout && !timer) {
      timer = setTimeout(() => {
        req.abort();
        reject(new Error(`ECONNABORTED:: timeout of ${config.timeout}ms exceeded`));
      }, config.timeout);
    }
  });
};
