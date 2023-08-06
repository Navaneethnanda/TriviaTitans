const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
   try {
    const { body } = event; 

     console.log("----------------------");
     console.log(body);
     const item = JSON.parse(body);

      console.log(item);
    const params = {
      TableName: 'Category',
      Item: item,
    };

    await docClient.put(params).promise();

    const data = await docClient.scan(params).promise()
    console.log(data);
    return {
      statusCode: 200,
      body: 'Category created successfully',
      value: data
    };
  } catch (error) {
    if (error instanceof SyntaxError) {
    console.error('Invalid JSON:', error.message);
  }
  return {
      statusCode: 500,
      body: 'Error creating Category',
    };
  }
};