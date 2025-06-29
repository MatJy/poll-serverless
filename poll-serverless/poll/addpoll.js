import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { ddbcli, doccli } from './ddbconn.js';

export const handler = async (event) => {
    const body = JSON.parse(event.body);

    const params = {
        TableName: process.env.ddb_table,
        Item: {
            pollid: body.pollid,
            question: body.question,
            options: body.options,
            votes: body.votes,
        },
    };

    try {
        const data = await doccli.send(new PutCommand(params));
        console.log('New poll created', data);
        return {
            statusCode: 201,
            body: JSON.stringify(params.Item),
        };
    } catch (e) {
        console.error(e);
    }
};
