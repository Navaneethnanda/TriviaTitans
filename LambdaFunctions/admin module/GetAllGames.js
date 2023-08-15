const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
   const params = {
    TableName: 'GameDetails'
  };

  try {
    const result = await docClient.scan(params).promise();
    const allData =  result.Items;

    console.log('All data:', allData);

    return {
      statusCode: 200,
      body: 'Data retrieved successfully',
      value: allData
    };
  
  } catch (error) {
    console.error('Error retrieving data:', error);
    return [];
  }
};