export default healthConfig: Array < any > =[
  {
    serviceName: 'owners-service',
    serviceURI: 'http://localhost/owners/health',
    timeout: 30000,
    retrycount: 3
  },
  {
    serviceName: 'pets-service',
    serviceURI: 'http://localhost/pets/health',
    timeout: 30000,
    retrycount: 3
  },
  {
    serviceName: 'monit-service',
    serviceURI: '',
    timeout: 30000,
    retrycount: 3
  }
];
