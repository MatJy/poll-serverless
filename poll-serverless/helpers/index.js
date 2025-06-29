/*
Helpperifunktiot, joita user-kansiossa olevat lambda-funktiot
käyttävät
*/

// Vastauksen lähetys asiakkaalle
const sendResponse = (statusCode, body) => {
    const response = {
        statusCode: statusCode,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
    };
    return response;
};
// Inputin validointi
const validateInput = (data) => {
    const body = JSON.parse(data);
    const { email, password } = body;
    if (!email || !password || password.length < 6) {
        return false;
    } else {
        return true;
    }
};

export { sendResponse, validateInput };
