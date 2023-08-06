const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

exports.handler = async (event) => {
  try {
    console.log("Received event:", event);

    const {
      name,
      email,
      phoneNumber,
      profilePicture,
      address,
      gamesPlayed,
      totalWins,
      points,
    } = event;

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone Number:", phoneNumber);
    console.log("Address:", address);

    let profilePictureUrl = "";

    if (event.profilePicture) {
      //const { createReadStream, mimetype } = await event.profilePicture;

      // const s3Params = {
      //   Bucket: 'serverless-profile-pics',
      //   Key: `profilePictures/${email}`,
      //   Body: createReadStream(),
      //   ContentType: mimetype
      // };
      const s3Params = {
        Bucket: "serverless-profile-pics",
        Key: `profilePictures/${email}`,
        Body: Buffer.from(profilePicture, "base64"),
        ContentEncoding: "base64",
        ContentType: "image/jpeg",
      };

      console.log("Uploading profile picture to S3...");
      await s3.upload(s3Params).promise();
      console.log("Profile picture uploaded to S3.");

      profilePictureUrl = `https://serverless-profile-pics.s3.us-east-1.amazonaws.com/profilePictures/${email}`;
    }

    const params = {
      TableName: "user",
      Item: {
        name,
        email,
        profilePictureUrl,
        phoneNumber,
        address,
        gamesPlayed,
        totalWins,
        points,
      },
    };

    console.log("Saving user data to DynamoDB...");
    await docClient.put(params).promise();
    console.log("User data saved to DynamoDB.");

    const getItemParams = {
      TableName: "user",
      Key: {
        email,
      },
    };

    console.log("Retrieving item from DynamoDB...");
    const data = await docClient.get(getItemParams).promise();
    console.log("Retrieved item from DynamoDB:", data.Item);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Successfully created item!",
        item: data.Item,
      }),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
