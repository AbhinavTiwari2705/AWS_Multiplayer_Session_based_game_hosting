const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
    const { username, password } = JSON.parse(event.body);

    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.COGNITO_CLIENT_ID,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password
        }
    };

    try {
        const response = await cognito.initiateAuth(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ token: response.AuthenticationResult.AccessToken })
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Authentication failed', error })
        };
    }
};
