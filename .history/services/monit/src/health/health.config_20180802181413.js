const config = [
  {
    dataCenter: 'owners-service',
    serviceName: 'owners-service',
    url: 'http://owners-service/owners/health',
    timeout: 30000,
    method: 'GET',
  },
  {
    dataCenter: 'pets-service',
    serviceName: 'pets-service',
    url: 'http://pets-service/pets/health',
    timeout: 30000,
    method: 'GET',
  },
];


module.exports = config;

