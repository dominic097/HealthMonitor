"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = [
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
exports.default = config;
//# sourceMappingURL=health.config.js.map