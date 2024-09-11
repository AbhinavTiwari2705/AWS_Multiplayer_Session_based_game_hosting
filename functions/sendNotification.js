const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event) => {
    const message = JSON.parse(event.Records[0].Sns.Message);

    const params = {
        Message: `Player ${message.playerId} has been matched!`,
        TopicArn: process.env.SNS_TOPIC_ARN
    };

    try {
        await sns.publish(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Notification sent' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error sending notification', error })
        };
    }
};
