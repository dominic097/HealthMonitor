"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthConfig = [
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
exports.dataCenter = ['owners-service', 'pets-service'];
//# sourceMappingURL=health.config.js.map