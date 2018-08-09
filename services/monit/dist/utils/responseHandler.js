"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SUCCESS = 'success';
const SERVER_ERROR = 500;
const STATUS_OK = 200;
class ResponseHandler {
    constructor(req, res, controller, arg) {
        this.handleResponse = (response) => {
            if (response.status === SUCCESS) {
                this.res.status(response.statusCode || STATUS_OK).send(this.successResult(response));
            }
            else {
                this.res.status(response.statusCode || SERVER_ERROR).send(this.failureResult(response));
            }
        };
        this.exceptionHandler = (error) => {
            this.res.status(SERVER_ERROR).send(this.failureResult(error));
        };
        this.successResult = (res) => {
            let { status, data = Object.assign({}, res), statusCode = STATUS_OK, message = '' } = res;
            return {
                status,
                data,
                statusCode,
                message: data.message,
            };
        };
        this.failureResult = (res) => {
            let { status, error = Object.assign({}, res), statusCode = SERVER_ERROR, message = '' } = res;
            return {
                status,
                error,
                statusCode,
                message: error.message,
            };
        };
        this.req = req;
        this.res = res;
        if (typeof controller === "function") {
            controller(arg).then(this.handleResponse).catch(this.exceptionHandler);
        }
        else if (typeof controller === "object") {
            this.handleResponse(controller);
        }
    }
}
exports.ResponseHandler = ResponseHandler;
//# sourceMappingURL=responseHandler.js.map