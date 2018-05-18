import uuid from 'uuid'
import * as AWS from 'aws-sdk';
import { BaseRepository } from './base/BaseRepository';

AWS.config.update({
    region: 'ap-southeast-2'
});

export class DynamoDB {
    public static Update() {

    }
    public static Provider() {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        return dynamoDb
    }
}

