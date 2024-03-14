import { useEffect, useState } from "react";
import "./App.css";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "PDF", "TIFF"];

function App() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  useEffect(() => {
    console.log("SELECTED FILE", file);
  }, [file]);

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
        <button id="ext-txt-btn" disabled={!file}>
          Extract Text
        </button>
        <div className="text-area-container">
          <textarea
            id="extracted-text"
            name="extracted-text"
            rows="10"
            cols="50"
            placeholder="Extracted text will be displayed here"
          />
        </div>
      </div>
    </>
  );
}

export default App;
