const AWS = require('aws-sdk');
const gameLift = new AWS.GameLift();

exports.handler = async (event) => {
    const { ticketId } = JSON.parse(event.body);

    const params = {
        GameSessionQueueName: process.env.GAME_SESSION_QUEUE,
        PlayerId: event.requestContext.authorizer.claims['sub'],
        TicketId: ticketId
    };

    try {
        const response = await gameLift.startGameSessionPlacement(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Game session started', response })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error starting game session', error })
        };
    }
};
