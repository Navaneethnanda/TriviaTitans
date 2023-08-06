const axios = require("axios");

exports.handler = async (event) => {
  try {
    const { category, difficulty, timeFrame } = event.queryStringParameters;

    const params = {
      category,
      difficulty,
      timeFrame
    };

    const response = await axios.get('https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/games', { params });
    const games = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify(games),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    };
  }
};
