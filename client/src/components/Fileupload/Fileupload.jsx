import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./Fileupload.css";
import FlashMessage from "../FlashMessage";
const Fileupload = ({setocrtext}) => {
  const [flashMessage, setFlashMessage] = useState(null);
    
  const displayError = (errorMessage) => {
    setFlashMessage({ message: errorMessage, type: "error" });
    setTimeout(() => {
      setFlashMessage(null);
    }, 5000); // Set timeout to clear the error message after 5 seconds
  };
  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      if (acceptedFiles.length === 0) {
        throw new Error("Please upload a file.");
      }
  
      const file = acceptedFiles[0];
  
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          "Invalid file type. Please upload a JPG, JPEG, or PNG file."
        );
      }
  
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("File size exceeds the limit of 2MB.");
      }
  
      const reader = new FileReader();
  
      reader.onload = async () => {
        try {
          const base64Image = reader.result.split(",")[1]; // Extract Base64-encoded image content
  
          const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
          const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
          const response = await axios.post(apiUrl, {
            requests: [
              {
                image: {
                  content: base64Image, // Use Base64-encoded image content
                },
                features: [
                  {
                    type: "TEXT_DETECTION",
                  },
                ],
                imageContext: {
                  languageHints: ["th", "en"], // Language hints for Thai and English
                },
              },
            ],
          });
          const t=response?.data?.responses[0]?.fullTextAnnotation?.text
          console.log(t);
          setocrtext(t);
          // Handle the response here - extract OCR text or other data
        } catch (error) {
          console.error("Error in Vision API request:", error.message);
          displayError("Error processing image. Please try again."); // Display user-friendly error message
        }
      };
  
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error:", error.message);
      displayError(error.message);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: ".jpg, .jpeg, .png",
    maxSize: 2 * 1024 * 1024,
  });

  return (
    <div
      className={`FileuploadContainer ${isDragActive ? "active" : ""}`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p className="FileuploadText">
        {isDragActive
          ? "Drop the files here"
          : "Drag & Drop files here or click here in the box to select files"}
      </p>
      <p className="SupportedFormats">
        (Supported formats: JPG, JPEG, PNG){" "}
        <span style={{ alignSelf: "center" }}>File Size: up to 2 MB</span>
      </p>
    </div>
  );
};

export default Fileupload;
