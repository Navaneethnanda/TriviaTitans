const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
 const { questionId } = event;

  const params = {
    TableName: 'QuestionDetails',
    Key: {
      Id: questionId
    }
  };

  try {
    const result = await dynamodb.get(params).promise();
    const allData =  result.Item;

    console.log('All data:', allData);

    return {
      statusCode: 200,
      body: 'Question retrieved successfully.',
      value: allData
    };
  
  } catch (error) {
    console.error('Error retrieving record:', error);
    throw error;
  }
};
