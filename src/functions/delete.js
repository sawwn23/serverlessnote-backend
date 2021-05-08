import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamodb-lib';

export const deleteNote = handler(async (event, context) => {
    const params = {
        TableName : process.env.tableName,
        Key : {
            userID: "100",
            noteID: event.pathParameters.id,
        },
    };

    await dynamoDb.delete(params);

    return { status : true };
});