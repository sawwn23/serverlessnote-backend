import  uuid from 'uuid';
import handler from "./libs/handler-lib";
import dynamoDB from './libs/dynamodb-lib';

export const create = handler(async (event, context) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Item: {
            // attributes of item to be created
            userID: event.requestContext.identity.cognitoIdentityId, // user id from the authentication
            noteID: uuid.v1(), // unique identifier
            content: data.content, //parsed from the body
            attachment: data.attachment, //parsed from the body
            createdAt: Date.now(),
        },
    };

    await dynamoDB.put(params);

    return params.Item;
});
