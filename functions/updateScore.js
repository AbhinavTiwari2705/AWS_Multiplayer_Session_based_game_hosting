const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const playerId = event.requestContext.authorizer.claims['sub'];
    const body = JSON.parse(event.body);

    const params = {
        TableName: process.env.PLAYER_DATA_TABLE,
        Key: { playerId },
        UpdateExpression: "set score = :score",
        ExpressionAttributeValues: {
            ":score": body.score
        },
        ReturnValues: "UPDATED_NEW"
    };

    try {
        const result = await dynamoDB.update(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Score updated', result })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating score', error })
        };
    }
};
