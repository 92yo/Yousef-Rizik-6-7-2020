const jwt = require("jsonwebtoken");

exports.genToken = function (id, email) {
  return new Promise(function (resolve, reject) {
    jwt.sign({ id, email }, process.env.SECRET, function (err, token) {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

exports.verifyToken = function (token) {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return { error: true, errorMessage: error.message };
  }
};
