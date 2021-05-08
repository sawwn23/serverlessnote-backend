import  uuid from 'uuid';
import dynamoDB from './libs/dynamodb-lib';


export async function create(event, context) {
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


try {
    await dynamoDB.put(params);

    return {
        statusCode: 200,
        body: JSON.stringify(params.Item),
    };
}   catch (e) {
    return {
        statusCode: 500,
        body: JSON.stringify({ error: e.message }),
    };
}

}