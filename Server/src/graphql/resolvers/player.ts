import { Target } from '../../../models/target';
import dbprovider from '../../../framework/dbprovider';
import { Game } from '../../../models/game';
import { Player } from '../../../models/player';
import { DocumentClient, GetItemInput, UpdateExpression, Key, UpdateItemInput, UpdateTableInput } from 'aws-sdk/clients/dynamodb';
import * as uuid from 'uuid';

export const getPlayers = (gameId: Key) => {
    const dynamoDb = dbprovider();
    const params: GetItemInput = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: gameId
        }
    }

    return new Promise((resolve, reject) =>
        dynamoDb.get(params, (err, result) => {
            if (err) {
                reject(err);
            }
            const game = result.Item as Game;
            const players = game.players;
            resolve(players);
        })
    )
}

export const addPlayer = async (gameId: string, name: string) => {
    const dynamoDb = dbprovider();
    const player: Player = {
        id: uuid.v1(),
        name: name,
        team: 0
    }
    console.log('creating player')
    //const params: GetItemInput = {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: gameId,
        },
        UpdateExpression: 'SET #attrName = list_append(#attrName, :attrValue)',
        ExpressionAttributeNames: {
            "#attrName": "players",
        },
        ExpressionAttributeValues: {
            ":attrValue": [player]
        },
        // UpdateExpression: 'SET #attrName = list_append(#attrName, :attrValue)',
        // ExpressionAttributeNames: {
        //     "#attrName": "players",
        // },
        // ExpressionAttributeValues: {
        //     ":attrValue": {
        //         L: [{
        //             M: {
        //                 "id": { "S": player.id },
        //                 "name": { "S": player.name },
        //                 "team": { "N": player.team.toString() },
        //             }
        //         }]
        //     }
        // },
        ReturnValues: 'UPDATED_NEW'
    }

    return new Promise((resolve, reject) =>
        dynamoDb.update(params, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(player);
        })
    )
}
