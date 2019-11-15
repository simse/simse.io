const axios = require('axios');

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
    try {
        const dockerhub = event.queryStringParameters.dockerhub || null
        const pip = event.queryStringParameters.pip || null

        let downloads = 0

        if(pip !== null) {
            await axios.get('https://pypistats.org/api/packages/' + pip + '/overall?mirrors=false')
                .then(function (response) {
                    response.data.data.forEach((value) => {
                        downloads = downloads + value.downloads
                    })
                })
        }

        if(dockerhub !== null) {
            await axios.get('https://hub.docker.com/v2/repositories/' + dockerhub)
                .then(function (response) {
                    // handle success
                    downloads = response.data.pull_count;
                })
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ downloads: downloads })
        }
    } catch (err) {
        return { statusCode: 500, body: err.toString() }
    }
}
