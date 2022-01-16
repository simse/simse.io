# things we need for NLP
from distutils.command.clean import clean
import nltk
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

import pickle
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras




data = pickle.load( open( "katana-assistant-data.pkl", "rb" ) )
words = data['words']
classes = data['classes']




def clean_up_sentence(sentence):
    # tokenize the pattern
    sentence_words = nltk.word_tokenize(sentence)
    # stem each word
    sentence_words = [stemmer.stem(word.lower()) for word in sentence_words]
    return sentence_words

print(clean_up_sentence("what languages to you speak?"))

# return bag of words array: 0 or 1 for each word in the bag that exists in the sentence
def bow(sentence, words, show_details=True):
    # tokenize the pattern
    sentence_words = clean_up_sentence(sentence)
    # bag of words
    bag = [0]*len(words)  
    for s in sentence_words:
        for i,w in enumerate(words):
            if w == s: 
                bag[i] = 1
                if show_details:
                    print ("found in bag: %s" % w)

    return(np.array(bag))





p = bow("Load bood pessure for patient", words)
print (p)
print (classes)





# Use pickle to load in the pre-trained model
# global graph
# graph = tf.get_default_graph()

model = keras.models.load_model("ai_simon.h5")





def classify_local(sentence):
    ERROR_THRESHOLD = 0.25
    
    # generate probabilities from the model
    input_data = pd.DataFrame([bow(sentence, words)], dtype=float, index=['input'])
    results = model.predict([input_data])[0]
    # filter out predictions below a threshold, and provide intent index
    results = [[i,r] for i,r in enumerate(results) if r>ERROR_THRESHOLD]
    # sort by strength of probability
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append((classes[r[0]], str(r[1])))
    # return tuple of intent and probability
    
    return return_list



classify_local('Hello, good day!')




classify_local('How you can assist me?')




classify_local('Get me to adverse medicine form')




classify_local('Place to log blood pressure')




classify_local('Fetch blood result for patient')




classify_local('Blood pressure monitoring in hospital')




classify_local('Look for hospital to monitor blood pressure')

input_data = pd.DataFrame([bow("hello there", words)], dtype=float, index=['input'])
string = ""
for x in bow("hello there", words):
    string += str(x) + ","

print(string)
exit(0)

app = Flask(__name__)
CORS(app)

@app.route("/katana-ml/api/v1.0/assistant", methods=['POST'])
def classify():
    ERROR_THRESHOLD = 0.25
    
    sentence = request.json['sentence']
    
    # generate probabilities from the model
    input_data = pd.DataFrame([bow(sentence, words)], dtype=float, index=['input'])
    results = model.predict([input_data])[0]
    # filter out predictions below a threshold
    results = [[i,r] for i,r in enumerate(results) if r>ERROR_THRESHOLD]
    # sort by strength of probability
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    # return tuple of intent and probability
    
    response = jsonify(return_list)
    return response

# running REST interface, port=5000 for direct test, port=5001 for deployment from PM2
if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5001)