interface CustomError extends Error {
  status?: number;
}

// create a function to send an Error message
const sendError = (message: string, code: number) => {
  const error = {
    status: "ERROR",
    code: code,
    message: message,
  };

  return error;
};

// create a function to send a success message
const sendSuccess = (message: string | { imageURL: Buffer }, code: number) => {
  const success = {
    status: "SUCCESS",
    code: code,
    message: message,
  };

  return success;
};

const newError = (message: string, code: number) => {
  const error: CustomError = new Error(message);
  error.status = code;
  throw error;
};

export default {
  sendError,
  sendSuccess,
  newError,
};
