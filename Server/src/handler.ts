export const hello = (event, context, cb) => {
  const body = {
    message: "Hello from Reason!"
  };
  const response = {
    statusCode: 200,
    body: JSON.stringify(body)
  };
  return cb(null, response);
}

