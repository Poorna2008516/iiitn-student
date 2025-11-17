const express = require("express");
const app = express();
app.use(express.json());
const fetch = require("node-fetch");

// Replace these with your values
const API_KEY = "AIzaSyC0XfO6bjHVjNMybt73nz9-G1Di62rDv-s";
const CX = "64386d9c644e74622";

app.post("/webhook", async (req, res) => {
    const userQuery = req.body.queryResult.queryText;

    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(userQuery)}&key=${API_KEY}&cx=${CX}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        let answer = "I couldn't find any information.";
        if (data.items && data.items.length > 0) {
            answer = data.items[0].snippet;
        }

        return res.json({
            fulfillmentText: answer
        });
    } catch (error) {
        return res.json({
            fulfillmentText: "Error fetching data from Google."
        });
    }
});

app.listen(3000, () => console.log("Webhook running on port 3000"));



