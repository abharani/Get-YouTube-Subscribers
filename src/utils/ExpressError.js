class ExpressError extends Error {
    message;
    statusCode;

    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.export = ExpressError;
