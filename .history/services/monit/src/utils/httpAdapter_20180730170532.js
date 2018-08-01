const http = require('http');
const https = require('https');

module.exports = (config) => {
  return new Promise((resolve, reject) => {
    const headers = config.headers;
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'express/nodejs';
    }

    const parsed = url.parse(config.url);
    const protocol = parsed.protocol || 'http:';
    
  });
};
