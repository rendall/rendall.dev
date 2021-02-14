import { User, Context } from "./interfaces";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const COMMENT_TOO_LONG = "comment is too long";
const INCLUDES_LINK = "comment includes link: user verification required";

const isBlacklisted = (ip: string) => false;
const extractUser = (context: Context): User => ({
  id: "guid",
  name: "name",
  email: "email",
});
const verifyText = (text: string): { verifyCode: Number; message: string } => {
  // too long?
  // has link?
  // is ok =>
  return { verifyCode: 200, message: "OK" };
};
const selectAllCommentsPromise = (path: string, user?: User) =>
  new Promise((resolve, reject) => {});
const insertCommentPromise = (user: User, body: string) =>
  new Promise((resolve, reject) => {});

const getComments = (event: Event, context: Context, callback: Function) =>
  selectAllCommentsPromise(context.path).then((comments) =>
    callback(null, { statusCode: 200, body: JSON.stringify(comments) })
  );

const putComment = (event: Event, context: Context, callback: Function) => {
  // validate info
  const user: User = extractUser(context);
  const { verifyCode, message } = verifyText(context.body);

  switch (verifyCode) {
    case 200:
      insertCommentPromise(user, context.body)
        .then(() => callback(null, { statusCode: 201, body: "Created" }))
        .catch((error) => {
          callback(null, { statusCode: 500, body: "Server error" });
        });
      break;

    case 400:
      switch (message) {
        case COMMENT_TOO_LONG:
          callback(null, { statusCode: 413, body: message });
          break;
        case INCLUDES_LINK:
          // must include WWW-Authenticate header per https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate
          callback(null, { statusCode: 401, body: message });
          break;
        default:
          callback(null, { statusCode: 400, body: message });
          break;
      }
  }
};

const commentsHandler = (
  event: Event,
  context: Context,
  callback: Function
) => {
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
