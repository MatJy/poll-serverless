import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { doccli } from './ddbconn.js';

export const handler = async (event) => {
    const params = {
        TableName: process.env.ddb_table,
    };

    try {
        const data = await doccli.send(new ScanCommand(params));
        // Nyt kun käytetään documentclientia saadaan kannasta JS-dataa
        console.log(data.Items);
        return data.Items;
    } catch (err) {
        console.error(err);
    }
};
