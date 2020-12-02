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
    var userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    lexruntime.putSession(
        {
            botAlias: 'Simse',
            botName: 'SimonClone',
            userId: userId,
            accept: 'text/plain; charset=utf-8'
        }, (error, data) => {
            if (error === null) {
                res.status(200).send({
                    status: "OK",
                    userId: userId
                })
            } else {
                res.status(500).send({
                    status: "ERROR",
                    error: error
                })
            }

        }
    )

    
}