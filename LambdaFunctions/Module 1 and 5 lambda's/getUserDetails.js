const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

exports.handler = async (event) => {
  try {
    console.log("Received event:", event);

    const { email } = event;

    console.log("Email:", email);

    const getItemParams = {
      TableName: "user",
      Key: {
        email,
      },
    };

    console.log("Retrieving user data from DynamoDB...");
    const data = await docClient.get(getItemParams).promise();
    console.log("Retrieved user data from DynamoDB:", data.Item);

    // Fetch the profile picture from S3
    const profilePictureParams = {
      Bucket: "serverless-profile-pics",
      Key: `profilePictures/${email}`,
    };
    let userWithProfilePicture = {};
    try {
      console.log("Fetching profile picture from S3...");
      const profilePictureData = await s3
        .getObject(profilePictureParams)
        .promise();
      const profilePicture = profilePictureData.Body;

      // Update the user object with the actual image
      userWithProfilePicture = {
        ...data.Item,
        profilePicture,
      };
    } catch (e) {
      // Update the user object with the actual image
      userWithProfilePicture = {
        ...data.Item,
        profilePicture: null,
      };
    }
    const scanParams = {
      TableName: "user",
    };

    console.log("Scanning DynamoDB table...");
    const allData = await docClient.scan(scanParams).promise();
    console.log("Retrieved all data from DynamoDB:", allData.Items);

    return {
      statusCode: 200,
      body: JSON.stringify({ user: userWithProfilePicture }),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
