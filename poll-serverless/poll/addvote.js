import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { doccli } from './ddbconn.js';

export const handler = async (event) => {
    const body = JSON.parse(event.body);
    const pollId = parseInt(event.pathParameters.id);
    const optionIndex = body.optionIndex; // esim. 1 jos käyttäjä äänestää toista vaihtoehtoa

    // kasvatetaan oikean vaihtoehdon äänimäärää yhdellä
    const updateExpr = `SET votes[${optionIndex}] = if_not_exists(votes[${optionIndex}], :zero) + :inc`;

    const params = {
        TableName: process.env.ddb_table,
        Key: { pollid: pollId },
        UpdateExpression: updateExpr,
        ExpressionAttributeValues: {
            ':inc': 1,
            ':zero': 0,
        },
        ReturnValues: 'UPDATED_NEW',
    };

    try {
        const result = await doccli.send(new UpdateCommand(params));
        console.log('Vote updated:', result);
        return {
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
        };
    } catch (err) {
        console.error('Error updating vote:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to update vote' }),
        };
    }
};
