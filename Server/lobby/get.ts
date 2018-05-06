const uuid = require('uuid');
const AWS = require('aws-sdk');
const { dbprovider } = require('../framework/dbprovider')
let dynamoDb = dbprovider();


module.exports = {
  one: (event, context, callback) => {
    console.log(event.pathParameters.id)
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: event.pathParameters.id
      }
    }

    dynamoDb.get(params, (err, result) => {
      if (err) {
        callback(null, {
          statusCode: err.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Can not the fetch the item'
        })
        return;
      }

      const keywords = result.Item.map(item => item.Value)

      const response = {
        statusCode: 200,
        body: JSON.stringify(keywords),
      }
      callback(null, response);
    })
  }
}