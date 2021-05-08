import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamodb-lib';

export const update = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName : process.env.tableName,
        Key: {
            userID: event.requestContext.identity.cognitoIdentityId, // id of the auth user
            noteID: event.pathParameters.id,
        },
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":attachment" : data.attachment || null,
            ":content" : data.content || null,
        },
        ReturnValue : "ALL_NEW",
    };

    await dynamoDb.update(params);

    return { status: true};
});