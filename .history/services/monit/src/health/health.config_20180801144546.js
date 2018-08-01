const config = [
  {
    serviceName: 'owners-service',
    url: 'http://127.0.0.1:80/owners/health',
    timeout: 30000,
    retrycount: 3,
    method: 'GET',
  },
  {
    serviceName: 'pets-service',
    url: 'http://127.0.0.1:80/pets/health',
    timeout: 30000,
    retrycount: 3,
    method: 'GET',
  },
  {
    serviceName: 'monit-service',
    url: 'http://localhost/pets/health',
    timeout: 30000,
    retrycount: 3,
    method: 'GET',
  },
];

module.exports = config;

