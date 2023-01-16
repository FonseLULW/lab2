const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(`${__dirname}/public`));

app.post("/chatbot", (req, res) => {
    res.set({'Access-Control-Allow-Origin': '*'})
    const message = req.body.message;
    const number = message.match(/\d+/);
    if (number) {
        fetch(`http://numbersapi.com/${number}?type=trivia`).then(response => response.text()).then(data => {
            res.json({
                "text": data
            });
        }).catch(err => {
            res.json({
                "text": "Sorry, I couldn't find any information about this number."
            });
        });
    } else {
        res.json({
            "text": "I'm sorry, I didn't understand your question. Please provide a number for me to give you information about."
        });
    }
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});