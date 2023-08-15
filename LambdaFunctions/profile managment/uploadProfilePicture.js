const AWS = require("aws-sdk");

const S3 = new AWS.S3();

exports.handler = async (event) => {
  try {
    const { image } = event.files;
    const { email } = event;
    const { filename, mimetype, createReadStream } = await image;
    let profilePictureUrl = "";
    const params = {
      Bucket: "serverless-profile-pics",
      Key: `profilePictures/${email}`,
      Body: createReadStream(),
      ContentType: mimetype,
    };

    const result = await S3.upload(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Image uploaded successfully",
        profilePictureUrl: `https://serverless-profile-pics.s3.us-east-1.amazonaws.com/profilePictures/${email}`,
      }),
    };
  } catch (error) {
    console.error("Error uploading image:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to upload image",
        error: error.message,
        profilePictureUrl: "",
      }),
    };
  }
};
