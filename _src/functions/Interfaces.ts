interface User {
    id: string
    name: string
    email: string
}

interface Comment {
    id: string
    user: User
    text: string
    reply?: string
}

interface Context {
    path: string;
    httpMethod: string;
    headers: Headers;
    queryStringParameters: QueryStringParameters;
    body: string;
    isBase64Encoded: boolean;
}

interface Headers {
    accept: string;
    'accept-encoding': string;
    'accept-language': string;
    'client-ip': string;
    connection: string;
    cookie: string;
    dnt: string;
    'upgrade-insecure-requests': string;
    'user-agent': string;
    via: string;
    'x-bb-ab': string;
    'x-bb-client-request-uuid': string;
    'x-bb-ip': string;
    'x-bb-loop': string;
    'x-cdn-domain': string;
    'x-country': string;
    'x-datadog-parent-id': string;
    'x-datadog-trace-id': string;
    'x-forwarded-for': string;
    'x-forwarded-proto': string;
    'x-language': string;
}

interface QueryStringParameters {
}

interface Event {
    callbackWaitsForEmptyEventLoop: boolean;
    logGroupName: string;
    logStreamName: string;
    functionName: string;
    memoryLimitInMB: string;
    functionVersion: string;
    clientContext: ClientContext;
    invokeid: string;
    awsRequestId: string;
    invokedFunctionArn: string;
}

interface ClientContext {
    custom: Custom;
}

interface Custom {
    netlify: string;
}