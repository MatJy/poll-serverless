/*
Vastaus privaatista reitistä saadaan vain jos token on lähetetty pyynnön headerissa:
Authorization: JWT-tokenin arvo (ilman lainausmerkkejä)
*/
export const handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: 'This is response from private route!',
                input: event,
            },
            null,
            2
        ),
    };
};
