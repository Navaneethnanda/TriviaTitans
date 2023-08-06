const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const tableName = "teamScores";

    // Query the DynamoDB table to get all items
    const params = {
      TableName: tableName,
    };

    const data = await dynamoDB.scan(params).promise();

    // Calculate the sum of scores for each team and format the response
    const teamScores = {};
    data.Items.forEach((item) => {
      const teamID = item.teamid;
      const score = item.score || 0; // If score is undefined, set it to 0
      teamScores[teamID] = (teamScores[teamID] || 0) + score;
    });

    const response = Object.entries(teamScores).map(([team, score]) => ({
      team,
      score,
    }));

    return {
      statusCode: 200,
      body: response,
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error retrieving data from DynamoDB" }),
    };
  }
};
