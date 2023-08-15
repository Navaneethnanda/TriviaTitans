const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { body } = event; 
 console.log("-------------");
const parsedBody = JSON.parse(body);
 console.log(body);
  const params = {
    TableName: 'QuestionDetails', 
    Key: {
      Id: parsedBody.Id
    },
    UpdateExpression: 'SET Question = :value1, Option1 = :value2, Option2 = :value3, Option3 = :value4, Option4 = :value5, Answer = :value6, Hint = :value7, Category = :value8, Difficulty = :value9, GameId = :value10',
    ExpressionAttributeValues: {
      ':value1': parsedBody.Question,
      ':value2': parsedBody.Option1,
      ':value3': parsedBody.Option2,
      ':value4': parsedBody.Option3,
      ':value5': parsedBody.Option4,
      ':value6': parsedBody.Answer,
      ':value7': parsedBody.Hint,
      ':value8': parsedBody.Category,
      ':value9': parsedBody.Difficulty,
      ':value10': parsedBody.GameId
    },
    ReturnValues: 'ALL_NEW' 
  };

  try {
    const result = await dynamodb.update(params).promise();
    return result.Attributes; 
  } catch (error) {
    console.error('Error updating record:', error);
    throw error;
  }
};