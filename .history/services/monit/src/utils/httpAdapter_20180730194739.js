const http = require('http');
const url = require('url');


module.exports = (config) => {
  return new Promise((resolve, reject) => {
    const headers = config.headers;
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

    let transport;
    if (config.transport) {
      transport = config.transport;
    } else {
      transport = isHttps ? https : http;
    }

  });
};
