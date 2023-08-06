const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const tableName = "teamScores";

    // Get the list/array of team IDs from the event
    const teamIDs = event.teamIDs || []; // If 'teamIDs' is undefined, set it as an empty array

    // Perform a full table scan to find all items with the given teamIDs
    const params = {
      TableName: tableName,
    };

    const data = await dynamoDB.scan(params).promise();
    let totalGamesPlayed = 0;
    let totalScore = 0;

    // Calculate the sum of occurrences for each team
    const teamOccurrences = {}; // Object to store teamID occurrences
    data.Items.forEach((item) => {
      if (teamIDs.includes(item.teamid)) {
        totalGamesPlayed++;
        totalScore = totalScore + item.score;
      }
    });

    console.log(totalGamesPlayed);

    return {
      statusCode: 200,
      body: JSON.stringify({
        totalGamesPlayed: totalGamesPlayed,
        totalScore: totalScore,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error retrieving data from DynamoDB" }),
    };
  }
};
