const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
   const { deleteId } = event;

  const params = {
    TableName: 'Category',
    Key: {
      Id: deleteId
    }
  };

  try {
    await dynamodb.delete(params).promise();
    return 'Record deleted successfully';
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
};
