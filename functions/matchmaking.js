const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const playerId = event.requestContext.authorizer.claims['sub'];
    const body = JSON.parse(event.body);

    const params = {
        TableName: process.env.MATCHMAKING_TABLE,
        Item: {
            ticketId: AWS.util.uuid.v4(),
            playerId: playerId,
            gameId: body.gameId,
            status: 'PENDING'
        }
    };

    try {
        await dynamoDB.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Matchmaking request submitted' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error submitting matchmaking request', error })
        };
    }
};
