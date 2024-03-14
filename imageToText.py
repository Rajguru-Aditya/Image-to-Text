from PIL import Image
import pytesseract

# Open an image file
image_path = './fedexawb.png'
img = Image.open(image_path)

# Use pytesseract to do OCR on the image
text = pytesseract.image_to_string(img)

# Print or store the extracted text
print("IMAGE to TEXT  --->", text)
