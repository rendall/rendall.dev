var JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
var COMMENT_TOO_LONG = "comment is too long";
var INCLUDES_LINK = "comment includes link: user verification required";
var isBlacklisted = function (ip) {
  return false;
};
var extractUser = function (context) {
  return {
    id: "guid",
    name: "name",
    email: "email",
  };
};
var verifyText = function (text) {
  return { verifyCode: 200, message: "OK" };
};
var selectAllCommentsPromise = function (path, user) {
  return new Promise(function (resolve, reject) {});
};
var insertCommentPromise = function (user, body) {
  return new Promise(function (resolve, reject) {});
};
var getComments = function (event, context, callback) {
  return selectAllCommentsPromise(context.path).then(function (comments) {
    return callback(null, { statusCode: 200, body: JSON.stringify(comments) });
  });
};
var putComment = function (event, context, callback) {
  var user = extractUser(context);
  var _a = verifyText(context.body),
    verifyCode = _a.verifyCode,
    message = _a.message;
  switch (verifyCode) {
    case 200:
      insertCommentPromise(user, context.body)
        .then(function () {
          return callback(null, { statusCode: 201, body: "Created" });
        })
        .catch(function (error) {
          callback(null, { statusCode: 500, body: "Server error" });
        });
      break;
    case 400:
      switch (message) {
        case COMMENT_TOO_LONG:
          callback(null, { statusCode: 413, body: message });
          break;
        case INCLUDES_LINK:
          callback(null, { statusCode: 401, body: message });
          break;
        default:
          callback(null, { statusCode: 400, body: message });
          break;
      }
  }
};
var commentsHandler = function (event, context, callback) {
  if (isBlacklisted(context.headers["client-ip"])) {
    callback(null, { statusCode: 204 });
    return;
  }
  switch (context.httpMethod) {
    case "GET":
      getComments(event, context, callback);
      break;
    case "PUT":
      putComment(event, context, callback);
      break;
    default:
      callback(null, { statusCode: 405, body: "Method not allowed" });
      break;
  }
};
exports.handler = commentsHandler;
export {};
