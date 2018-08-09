"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require('joi');
const uuidv4 = require('uuid/v4');
// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();
const nodeId = uuidv4();
// define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(['development', 'production', 'test', 'provision'])
        .default('development'),
    PORT: Joi.number()
        .default(3000),
    MONGOOSE_DEBUG: Joi.boolean()
        .when('NODE_ENV', {
        is: Joi.string().equal('development'),
        then: Joi.boolean().default(true),
        otherwise: Joi.boolean().default(false),
    }),
    MONGO_HOST: Joi.string().required()
        .description('Mongo DB host url'),
    MONGO_PORT: Joi.number()
        .default(27017),
    SCHEDULER_INTERVAL: Joi.number()
        .default(10000),
}).unknown()
    .required();
const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.appConfig = {
    nodeId,
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongooseDebug: envVars.MONGOOSE_DEBUG,
    mongo: {
        host: envVars.MONGO_HOST,
        port: envVars.MONGO_PORT,
    },
    intervalTime: envVars.SCHEDULER_INTERVAL,
};
//# sourceMappingURL=app.config.js.map