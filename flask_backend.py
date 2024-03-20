from flask import Flask, request
from PIL import Image
import pytesseract
from flask_cors import CORS, cross_origin

pytesseract.pytesseract.tesseract_cmd = r'C:\Users\adrajguru\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'
image_path = './fedexawb.png'

app = Flask(__name__)
CORS(app, support_credentials=True)
@app.get('/text')
def extractText():
    img = Image.open(image_path)
    # img = "https://replicate.delivery/pbxt/Jj87qg6dTft3R5kFIzda2vorF3epnzwJpv96PsKcgkdZipLV/figure-65.png"

    # Use pytesseract to do OCR on the image
    text = pytesseract.image_to_string(img)

    # cleaned_text = text.strip()

    print("IMAGE to TEXT  --->", text)
    return text

@app.route('/gettext', methods=['POST'])
def getfile():
    file = request.files['file']
    print("FILE --->", file)
    img = Image.open(file)
    # img = "https://replicate.delivery/pbxt/Jj87qg6dTft3R5kFIzda2vorF3epnzwJpv96PsKcgkdZipLV/figure-65.png"

    # Use pytesseract to do OCR on the image
    text = pytesseract.image_to_string(img)

    # cleaned_text = text.strip()

    print("IMAGE to TEXT  --->", text)
    return text