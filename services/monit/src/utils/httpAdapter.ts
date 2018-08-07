import { API_RESPONSE } from "../@types/index";

const http = require('http');
const https = require('https');
const url = require('url');

const TIME_OUT_STATUS = 504;
const BAD_REQ = 400;

function normalizeError(mess, data, status) {
  return {
    err: data || new Error(mess),
    status,
  };
}

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
    reject(normalizeError(`Request failed with status code ${response.status}`, { ...response.config, data: response.data }, response.status));
  }
}

export default (config) => {
  return new Promise((resolve, reject) => {
    const headers = config.headers || {};
    let timer = null;
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'express/nodejs';
    }

    const parsed = url.parse(config.url);
    const protocol = parsed.protocol || 'http:';
    const isHttps = protocol === 'https:';
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || 80,
      path: parsed.path,
      method: config.method,
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
      const stream = res;

      // return the last request in case of redirects
      const lastRequest = res.req || req;

      const response: API_RESPONSE = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config,
        request: lastRequest,
        data: ''
      };

      const responseBuffer = [];
      stream.on('data', (chunk) => {
        responseBuffer.push(chunk);
      });

      stream.on('end', () => {
        let responseData: Buffer = Buffer.concat(responseBuffer);
        let strResponseData: String;
        if (config.responseType !== 'arraybuffer') {
          strResponseData = responseData.toString('utf8');
        }

        response.data = strResponseData;
        settle(resolve, reject, response);
      });
    });

    // Handle request timeout
    if (config.timeout && !timer) {
      timer = setTimeout(() => {
        req.abort();
        reject(normalizeError(`ECONNABORTED:: timeout of ${config.timeout}ms exceeded`, { ...config }, TIME_OUT_STATUS));
      }, config.timeout);
    }

    // Send the request
    req.end();
  });
};