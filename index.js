const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/chatbot", (req, res) => {
    console.log("Req: ", req);
    res.header("Access-Control-Allow-Origin", '*')
    const message = req.body.message;
    const number = message.match(/\d+/);
    if (number) {
        fetch(`http://numbersapi.com/${number}?type=trivia`).then(response => response.text()).then(data => {
            console.log("Res: ", res);
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});