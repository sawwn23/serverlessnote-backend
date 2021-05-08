import dynamoDb from './libs/dynamodb-lib';
import handler from './libs/handler-lib';

export const list = handler(async(event, context) => {
    const params = {
        TableName : process.env.tableName,
        KeyConditionExpression : "userID = :userID",
        ExpressionAttributeValues : {
            ":userID" : "100",
        },
    };

    const result = await dynamoDb.query(params);

    return result.Items;
});

