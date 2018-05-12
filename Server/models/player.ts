import { AttributeValue } from 'aws-sdk/clients/dynamodb';

export interface Player extends AttributeValue {
    id: string;
    name: string;
    team: number;
}
