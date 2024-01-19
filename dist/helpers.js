// create a function to send an Error message
const sendError = (message, code) => {
    const error = {
        status: "ERROR",
        code: code,
        message: message,
    };
    return error;
};
// create a function to send a success message
const sendSuccess = (message, code) => {
    const success = {
        status: "SUCCESS",
        code: code,
        message: message,
    };
    return success;
};
const newError = (message, code) => {
    const error = new Error(message);
    error.status = code;
    throw error;
};
export default {
    sendError,
    sendSuccess,
    newError,
};
