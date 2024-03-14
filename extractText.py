from PIL import Image
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

image_path = './fedexawb.png'
# img = Image.open(image_path)
img = "https://replicate.delivery/pbxt/Jj87qg6dTft3R5kFIzda2vorF3epnzwJpv96PsKcgkdZipLV/figure-65.png"

# Use pytesseract to do OCR on the image
text = pytesseract.image_to_string(img)

# cleaned_text = text.strip()

print("IMAGE to TEXT  --->", text)
