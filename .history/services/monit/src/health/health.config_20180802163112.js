const config = [
  {
    dataCenter: 'owners-service',
    serviceName: 'owners-service',
    url: 'http://localhost/owners/health',
    timeout: 30000,
    method: 'GET',
  },
  {
    dataCenter: 'owners-service',
    serviceName: 'pets-service',
    url: 'http://localhost/pets/health',
    timeout: 30000,
    method: 'GET',
  },
];


module.exports = config;

