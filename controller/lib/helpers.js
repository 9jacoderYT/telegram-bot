function errorHandler(error, name, from) {
  let loggerFunction = console.log;

  loggerFunction("-------------START--------------");
  loggerFunction("Error occured in " + name);

  if (from === "axios") {
    if (error.response) {
      // the request was made and the server responded witha status code
      // that falls out of the range of 2xx
      loggerFunction(error.response.data);
      loggerFunction(error.response.status);
      loggerFunction(error.response.headers);
    } else if (error.request) {
      // the  request  was made but no response was received
      // 'error.request is an instance of XMLHttpRequest in the browser
      // http.ClientRequest in node.js
      loggerFunction(error.request);
    } else {
      // something happened in setting up the request that triggered
      loggerFunction("Error", error.message);
    }
  }

  loggerFunction("---------------END--------------");
}

module.exports = {
  errorHandler,
};
