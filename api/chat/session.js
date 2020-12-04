var AWS = require('aws-sdk');

AWS.config.update(
    {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
        region: "eu-west-2"
    }
);

var lexruntime = new AWS.LexRuntime({ apiVersion: '2016-11-28' });


module.exports = (req, res) => {
    var userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    lexruntime.putSession(
        {
            botAlias: 'Simse',
            botName: 'SimonClone',
            userId: userId,
            accept: 'text/plain; charset=utf-8'
        }, (error, data) => {
            if (error) {
                res.status(500).send({
                    status: "ERROR",
                    error: error
                })
            } else {
                res.status(200).send({
                    status: "OK",
                    userId: userId
                })
            }
        }
    )
}