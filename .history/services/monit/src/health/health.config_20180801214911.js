const config = [
  {
    serviceName: 'owners-service',
    url: 'http://localhost/owners/health',
    timeout: 30000,
    method: 'GET',
  },
  {
    serviceName: 'pets-service',
    url: 'http://localhost/pets/health',
    timeout: 30000,
    method: 'GET',
  },
];


module.exports = config;

