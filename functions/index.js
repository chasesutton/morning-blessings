/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const cors = require("cors")({origin: "http://localhost:3000"});

admin.initializeApp();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || functions.config().openai.apikey;

exports.getBotResponse = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const {message} = req.body;

      if (!message) {
        console.error("No message provided");
        res.status(400).send("The function must be called with one argument 'message'.");
        return;
      }

      console.log("Received message:", message);

      const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: message}],
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
          },
      );

      console.log("Full response from OpenAI:", response.data);

      const botMessage = response.data.choices[0].message.content;
      console.log("Response from OpenAI:", botMessage);

      res.json({text: botMessage});
    } catch (error) {
      console.error("Error in getBotResponse:", error.message);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request data:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
      res.status(500).send("Error getting response from OpenAI");
    }
  });
});
