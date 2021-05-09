### Fist create api function
```
import  uuid from 'uuid';
import dynamoDB from './libs/dynamodb-lib';
export async function create(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
            // attributes of item to be created
            userID: "100", // user id from the authentication
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
```
### To test 
```
 {

     "body": "{\"content\":\"hello world\",\"attachment\":\"hello.jpg\"}"

 }
```

```
➜sls invoke local -f create --path src/tests/create-event.json
```

### IAM Policy

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "mobileanalytics:PutEvents",
        "cognito-sync:*",
        "cognito-identity:*"
      ],
      "Resource": [
        "*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "arn:aws:s3:::serverlessknx-notes-app-upload/private/${cognito-identity.amazonaws.com:sub}/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "execute-api:Invoke"
      ],
      "Resource": [
        "arn:aws:execute-api:ap-northeast-1:*:14vdtec3ub/*/*/*"
      ]
    }
  ]
}
```

### Test as auth user
```
npx aws-api-gateway-cli-test \
--username='swn@kernellix.com' \
--password='swn238@@' \
--user-pool-id='ap-northeast-1_RieD32mhQ' \
--app-client-id='ovf94lg10sbsjk6qp22puolsg' \
--cognito-region='ap-northeast-1' \
--identity-pool-id='ap-northeast-1:0e383aad-63b2-4ff8-ae83-5d24e1e14a2b' \
--invoke-url='https://14vdtec3ub.execute-api.ap-northeast-1.amazonaws.com/dev' \
--api-gateway-region='ap-northeat-1' \
--path-template='/v1/notes' \
--method='POST' \
--body='{"content":"hello world","attachment":"hello.jpg"}'
```