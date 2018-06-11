import { Target } from '../../../models/target';
import dbprovider from '../../../framework/dbprovider';
import { Game } from '../../../models/game';
import { Player } from '../../../models/player';
import { DocumentClient, GetItemInput, UpdateExpression, Key, UpdateItemInput, UpdateTableInput } from 'aws-sdk/clients/dynamodb';
import * as uuid from 'uuid';

export const changeTeam = async (gameId: Key, name: String, team: number) => {
    const dynamoDb = dbprovider();
    //get list 
    const getParams: GetItemInput = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: gameId
        }
    }
    const response = await dynamoDb.get(getParams, (err, result) => {
        const game = result.Item as Game;
        return (game);
    }).promise()


    const game = response.Item as Game
    const players = game.players.map(player => {
        if (player.name != name) return player
        return { ...player, team: team }
    })

    const updateParams = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: gameId
        },
        UpdateExpression: "set game.players = :players",
        ExpressionAttributeValues: {
            ":players": players,
        },
        ReturnValues: "UPDATED_NEW"
    }

    return dynamoDb.update(updateParams, (err, result) => {
        if (err) {
            return null
        }
        return players
    }).promise();
}

