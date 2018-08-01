const config = [
  {
    serviceName: 'owners-service',
    serviceURI: 'http://localhost/owners/health',
    timeout: 30000,
    retrycount: 3,
    method: 'GET',
  },
  {
    serviceName: 'pets-service',
    serviceURI: 'http://localhost/pets/health',
    timeout: 30000,
    retrycount: 3,
    method: 'GET',
  },
  {
    serviceName: 'monit-service',
    serviceURI: '',
    timeout: 30000,
    retrycount: 3,
    method: 'GET',
  },
];

module.exports = config;

