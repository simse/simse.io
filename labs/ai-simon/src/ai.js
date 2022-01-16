import * as tf from '@tensorflow/tfjs'
import { lancasterStemmer } from 'lancaster-stemmer'

const ai = {
    model: null,
    classes: null,
    words: null,
    test: () => {
        console.log("test")
    },
    load: () => {
        let prefix = process.env.NODE_ENV === "development" ? "" : "/ai-simon"

        tf.loadLayersModel(prefix + '/model/model.json').then(model => {
            ai.model = model
        })
        
        fetch(prefix + "/model/classes.json").then(response => response.json()).then(data => {
            ai.classes = data
        })

        fetch(prefix + "/model/words.json").then(response => response.json()).then(data => {
            ai.words = data
        })
    },
    parseInput: (sentence) => {
        let parts = []

        sentence = sentence.replace("?", "").replace("!", "").replace(".", "").replace(",", "")

        sentence.split(" ").forEach(word => {
            parts.push(lancasterStemmer(word))
        })

        let countedParts = []

        ai.words.forEach(word => {
            countedParts.push(parts.filter(x => x === word).length)
        })

        //console.log(parts)
        //console.log(countedParts)
        //console.log(ai.words)
        return countedParts
    },
    invokeModel: (parts) => {
        let result = ai.model.predict(tf.tensor(parts, [1, ai.words.length])).arraySync()[0];

        // ensure there is enough certaintity
        if(result.filter(x => x > 0.6).length === 0) {
            return null
        }

        //console.log(result)
        //console.log(Math.max(...result))

        return ai.classes[result.indexOf(Math.max(...result))]
    },
    message: (input) => {
        return ai.invokeModel(ai.parseInput(input))
    }
}

export default ai