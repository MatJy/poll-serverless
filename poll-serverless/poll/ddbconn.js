import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

// käytetään kantaa pilvestä eu-north-1 regionista
const ddbcli = new DynamoDBClient({ region: 'eu-north-1' });

// määritykset kun muutetaan JS-tyypit DDB-tyypeiksi
const marshallOptions = {
    convertEmptyValues: false,
    removeUndefinedValues: true,
    convertClassInstanceToMap: false,
};
// määritykset kun muutetaan DDB-tyypit JS-tyypeiksi
const unmarshallOptions = {
    wrapNumbers: false,
};
// documentclient-olio
const doccli = DynamoDBDocumentClient.from(ddbcli, {
    marshallOptions,
    unmarshallOptions,
});
// exportataan dynamodbclient ja documentclient -oliot
export { ddbcli, doccli };
