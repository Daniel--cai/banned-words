import { Target } from '../../../models/target';
import dbprovider from '../../../framework/dbprovider';
import {Game } from '../../../models/game';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const getPlayers = (event, context, callback) => {

    const dynamoDb = dbprovider();
    const gameId: number = event.id;
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: gameId
        }
    }

    dynamoDb.get(params, (err, result) => {
        if (err) {
            callback(null, null)
            return;
        }

        const game = result.Item;
        const players = game.players;
        callback(null, players);
    })
}

export const addPlayer = (event, context, cb) => {

}