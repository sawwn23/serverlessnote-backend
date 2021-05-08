import dynamoDb from './libs/dynamodb-lib';

export async function get(event, context) {
    const params = {
        TableName : process.env.tableName,
        Key : {
            userID: event.requestContext.identity.cognitoIdentityId,
            noteID: event.pathParameters.id,
        },
    };

    const result = await dynamoDb.get(params);

    if (!result.Item){
        throw new Error("Item not found");
    }

    return result.Item;
};