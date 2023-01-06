# from google.cloud import datastore
from pythainlp import word_tokenize
from flask import Flask , request, jsonify
from flask_cors import CORS

from pythainlp.corpus import thai_stopwords
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import matplotlib  
from dotenv import load_dotenv
import os
load_dotenv()   
matplotlib.use('Agg')    

set_port = os.getenv("PORT")
app = Flask(__name__) 
CORS(app)

is_font_path = "./THSarabunNew.ttf"


@app.route('/api/debug', methods = ['GET'])
def debugging():
    if request.method == 'GET':
        return "OK"

@app.route('/api/wordcloud', methods = ['POST'])
def send_word_cloud():

    image = BytesIO()
    set_stop_word =  thai_stopwords()
    
    if request.method == 'POST':
        # base64_array = []
        req = request.get_json(force=True)
        # print("req body ===> ",req['text'])
        text = req['text']
        print("text => ",text)
        if(text != ''):

            words = word_tokenize(text) 
            all_words = ' '.join(words).lower().strip()
            print("all_words ==> ",all_words)

            wordcloud = WordCloud(
                        regexp='[ก-๙]+',
                        font_path=is_font_path,
                        stopwords=set_stop_word,
                        width=250, 
                        height=250,
                        prefer_horizontal=1,
                        max_words=50, 
                        colormap='tab20c',
                        background_color = 'white').generate(all_words)

            plt.figure(figsize = (10, 9))
            plt.imshow(wordcloud)
            plt.axis('off')
            plt.tight_layout(pad=0)
            plt.savefig(image, format='png')

            base64_img = base64.encodestring(image.getvalue())

            return base64_img

        else:
            text= "ทดสอบระบบ wordcloud นะครับ"
            words = word_tokenize(text) 
            all_words = ' '.join(words).lower().strip()

            wordcloud = WordCloud(
                        regexp='[ก-๙]+',
                        font_path=is_font_path,
                        stopwords=set_stop_word,
                        width=250, 
                        height=250,
                        prefer_horizontal=1,
                        max_words=50, 
                        colormap='tab20c',
                        background_color = 'white').generate(all_words)

            plt.figure(figsize = (10, 9))
            plt.imshow(wordcloud)
            plt.axis('off')
            plt.tight_layout(pad=0)
            plt.savefig(image, format='png')

            base64_img = base64.encodestring(image.getvalue())

            return base64_img



if __name__ == '__main__':
    app.run(debug=False, port=set_port)