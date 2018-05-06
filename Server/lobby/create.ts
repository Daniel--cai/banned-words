import { Target } from '../models/target';
import dbprovider from '../framework/dbprovider';
import * as uuid from 'uuid'
import { Player } from '../models/player'

const dynamoDb = dbprovider();


export const createLobby = (event, context, callback) => {

  const code: string = uuid.v1();
  const player: Player = {
    name: event.name,
    team: 0
  }
  var params = {
    Item: {
      id: code.substring(0, 5),
      players: [player],
      teams: ["blue", "red"],
      keywords: [[], []],
      banned: [[], []]
    },
    TableName: process.env.DYNAMODB_TABLE
  };

  dynamoDb.put(params, function (err, data) {
    if (err) {
      callback(err, null);
    } else {
      const response = {
        statusCode: 200,
        body: JSON.stringify(params.Item.id),
      }
      callback(null, response);
    }
  })
}
