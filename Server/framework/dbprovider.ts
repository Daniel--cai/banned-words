import uuid from 'uuid'
import * as AWS from 'aws-sdk';

AWS.config.update({
	region: 'ap-southeast-2'
});

export default () => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    return dynamoDb
}
