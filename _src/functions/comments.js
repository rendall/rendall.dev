const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const COMMENT_TOO_LONG = "comment is too long";
const INCLUDES_LINK = "comment includes link: user verification required";
const isBlacklisted = (ip) => false;
const extractUser = (context) => ({
    id: "guid",
    name: "name",
    email: "email"
});
const verifyText = (text) => {
    return { verifyCode: 200, message: "OK" };
};
const selectAllCommentsPromise = (path, user) => new Promise((resolve, reject) => { });
const insertCommentPromise = (user, body) => new Promise((resolve, reject) => { });
const getComments = (event, context, callback) => selectAllCommentsPromise(context.path).then(comments => callback(null, { statusCode: 200, body: JSON.stringify(comments) }));
const putComment = (event, context, callback) => {
    const user = extractUser(context);
    const { verifyCode, message } = verifyText(context.body);
    switch (verifyCode) {
        case 200:
            insertCommentPromise(user, context.body)
                .then(() => callback(null, { statusCode: 201, body: "Created" }))
                .catch(error => {
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
const commentsHandler = (event, context, callback) => {
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
