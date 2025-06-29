import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import { sendResponse, validateInput } from '../helpers/index.js';

const cognito = new CognitoIdentityProvider();

export const handler = async (event) => {
    try {
        // validateInput tarkistaa että bodyssa tuli oikeaa dataa
        const isValid = validateInput(event.body);
        if (!isValid) {
            return sendResponse(400, { message: 'Invalid input' });
        }

        const { email, password } = JSON.parse(event.body);
        const { user_pool_id } = process.env;
        // Käyttäjäolio luodaan cognitoon params-olion tiedoista
        const params = {
            UserPoolId: user_pool_id,
            Username: email,
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email,
                },
                {
                    Name: 'email_verified',
                    Value: 'true',
                },
            ],
            // estetään automaattinen viesti siitä että käyttäjä luotiin Cognitoon
            MessageAction: 'SUPPRESS',
        };
        // luodaan käyttäjä cognitoon
        const response = await cognito.adminCreateUser(params);

        // luodaan käyttäjälle salasana cognitoon
        if (response.User) {
            const paramsForSetPass = {
                Password: password,
                UserPoolId: user_pool_id,
                Username: email,
                Permanent: true, // pysyvä salasana
            };
            await cognito.adminSetUserPassword(paramsForSetPass);
        }
        // ilmoitus onnistuneesta rekisteröitymisestä
        return sendResponse(200, { message: 'User registration successful' });
    } catch (error) {
        // virheilmoitus
        const message = error.message ? error.message : 'Internal server error';
        return sendResponse(500, { message });
    }
};
