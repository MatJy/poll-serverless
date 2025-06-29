import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { doccli } from './ddbconn.js';

export const handler = async (event) => {
    const pollid = parseInt(event.pathParameters.id);
    const params = {
        TableName: process.env.ddb_table,
        Key: {
            pollid: pollid,
        },
    };

    try {
        const data = await doccli.send(new GetCommand(params));

        return {
            statusCode: 200,
            body: JSON.stringify(data.Item),
        };
    } catch (err) {
        console.error('Error fetching poll:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch poll' }),
        };
    }
};
