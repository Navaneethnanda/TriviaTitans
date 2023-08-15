const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
   const params = {
    TableName: 'TeamAndUser' 
  };

  try {
    const result = await docClient.scan(params).promise();
    const allData =  result.Items;

    console.log('All data:', allData);

    return {
      statusCode: 200,
      body: 'All data retrieved successfully',
      value: allData
    };
  
  } catch (error) {
    console.error('Error retrieving data:', error);
    return [];
  }
};