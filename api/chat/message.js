var AWS = require('aws-sdk');

AWS.config.update(
    {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
        region: "eu-west-2"
    }
);

var lexruntime = new AWS.LexRuntime({apiVersion: '2016-11-28'});


module.exports = (req, res) => {
    const { userId, message } = req.query

    lexruntime.postText({
        botAlias: 'Simse',
        botName: 'SimonClone',
        inputText: message,
        userId: userId
    }, (error, data) => {
        if (error) {
            res.status(500).send({
                status: "ERROR",
                error: error
            })
        } else {
            res.status(200).send({
                status: "OK",
                response: data.message,
                intent: data.intentName
            })
        }
    })
}