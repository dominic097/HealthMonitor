export const healthConfig = [
  {
    dataCenter: 'owners-service',
    serviceName: 'owners-service',
    url: 'http://localhost/owners/health',
    timeout: 30000,
    method: 'GET',
  },
  {
    dataCenter: 'pets-service',
    serviceName: 'pets-service',
    url: 'http://localhost/pets/health',
    timeout: 30000,
    method: 'GET',
  },
];

export const dataCenter = ['owners-service', 'pets-service']

