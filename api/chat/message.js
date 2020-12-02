var AWS = require('aws-sdk');

let access_id = process.env.AWS_ID
let access_key = process.env.AWS_SECRET

AWS.config.update(
    {
        accessKeyId: access_id,
        secretAccessKey: access_key,
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
        if (error === null) {
            res.status(200).send({
                status: "OK",
                response: data.message,
                intent: data.intentName
            })
        } else {
            res.status(500).send({
                status: "ERROR",
                error: error
            })
        }
    })

    
}