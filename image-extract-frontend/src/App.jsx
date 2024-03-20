import { useEffect, useState } from "react";
import "./App.css";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios"
import { Oval } from 'react-loader-spinner'


const fileTypes = ["JPG", "PNG", "GIF", "PDF", "TIFF"];
const terms = ["do", "not"];

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (file) => {
    setFile(file);
  };
  const [textFromImage, setTextFromImage] = useState("");

  useEffect(() => {
    console.log("SELECTED FILE", file);
  }, [file]);

  useEffect(() => {
    console.log("TEXT FROM IMAGE ->", textFromImage)
  },[textFromImage])

  const GetText = async () => {
    const response = await axios.get("http://127.0.0.1:5000/text")
    return setTextFromImage(response?.data)
  }

  const GetExtractedText = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("http://127.0.0.1:5000/gettext",
      {
        file: file
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    setLoading(false);
    return setTextFromImage(response?.data)
  }

  return (
    <>
      <h1>Extract Text from Image</h1>
      <div className="main-container">
        <div className="file-drag-drop-container">
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            multiple={false}
            label="Drag & Drop files here"
            typesError="File type not allowed"
            children={
              <div>
                {file && <p>{file.name}</p>}
                <p>Drag & Drop files here</p>
                <p>or</p>
                <button type="button">Browse Files</button>
              </div>
            }
          />
        </div>
        <button 
          id="ext-txt-btn"
          disabled={!file}
          // onClick={GetText}
          onClick={GetExtractedText}
        >
          {
            loading ? (
              <Oval
                visible={true}
                height="20"
                width="20"
                color="#fff"
                secondaryColor="#fff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
            ) : "Extract Text"
          }
        </button>
        <div className="text-area-container">
          <p>
            {!textFromImage && "Drag and drop the file or select the file to see the text here"}
            {
              textFromImage ? 
              (
                <>
                  {/* highlight specific keywords if present in the text */}
                  {textFromImage.split(" ").map((word, index) => {
                    if (terms.includes(word.toLowerCase())) {
                      return <span key={index} style={{ color: "red", backgroundColor: "yellow", fontWeight: "bold" }}>{word} </span>
                    }
                    return <span key={index}>{word} </span>
                  })}
                </>
              ) : (
                <p></p>
              )
            }
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
