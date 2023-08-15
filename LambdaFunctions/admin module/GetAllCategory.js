const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
   const params = {
    TableName: 'Category' 
  };

  try {
    const result = await docClient.scan(params).promise();
    const allData =  result.Items;

    console.log('All data:', allData);

    return {
      statusCode: 200,
      body: 'Category retrieved successfully',
      value: allData
    };
  
  } catch (error) {
    console.error('Error retrieving Category:', error);
    return [];
  }
};