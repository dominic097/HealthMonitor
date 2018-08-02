const config = [
  {
    data-center: '',
    serviceName: 'owners-service',
    url: 'http://localhost/owners/health',
    timeout: 30000,
    method: 'GET',
  },
  {
    data-center: '',
    serviceName: 'pets-service',
    url: 'http://localhost/pets/health',
    timeout: 30000,
    method: 'GET',
  },
];


module.exports = config;

