const SUCCESS = 'success';

const SERVER_ERROR = 500;
const STATUS_OK = 200;

interface ResponseSchema {
  status: String;
  data?: Object;
  error?: Object;
  statusCode: Number;
  message: String;
}


export class ResponseHandler {
  private res;
  private req;
  private status

  private responseObj: ResponseSchema;

  constructor(req, res, controller, arg?: any) {
    this.req = req;
    this.res = res;

    if (typeof controller === "function") {
      controller(arg).then(this.handleResponse).catch(this.exceptionHandler);
    } else if (typeof controller === "object") {
      this.handleResponse(controller);
    }
  }

  handleResponse = (response) => {
    if (response.status === SUCCESS) {
      this.res.status(response.statusCode || STATUS_OK).send(this.successResult(response));
    }
    else {
      this.res.status(response.statusCode || SERVER_ERROR).send(this.failureResult(response));
    }
  }

  exceptionHandler = (error) => {
    this.res.status(SERVER_ERROR).send(this.failureResult(error));
  }

  successResult = (res): ResponseSchema => {
    let { status, data = { ...res }, statusCode = STATUS_OK, message = '' } = res;
    return {
      status,
      data,
      statusCode,
      message: data.message,
    }
  }

  failureResult = (res): ResponseSchema => {
    let { status, error = { ...res }, statusCode = SERVER_ERROR, message = '' } = res;
    return {
      status,
      error,
      statusCode,
      message: error.message,
    }
  }
}
