const config = [
  {
    serviceName: 'owners-service',
    url: 'http://localhost:3001/owners/health',
    timeout: 30000,
    retrycount: 3,
    method: 'GET',
  },
  {
    serviceName: 'pets-service',
    url: 'http://localhost:3001/pets/health',
    timeout: 30000,
    retrycount: 3,
    method: 'GET',
  },
];


module.exports = config;

