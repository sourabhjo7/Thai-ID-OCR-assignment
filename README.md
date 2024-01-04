## Thai-ID-OCR-assignment

- deployed application Link:- https://thai-id-ocr-client.netlify.app/
- deployed Backend-API Link :- https://thai-id-ocr-assignment-production.up.railway.app/

- Welcome to Thai-Id-OCR App  which is a full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack. It provides a platform for uploading Thai Id Cards which is  then processed by the application to extract relevant Data by using  OCR Processing using google Vission API and generative AI (openAI).
-providing users with a dashboard of creating editing filtering and soft deleting records of Processed data from the ID card stored in Database 


## Features

- Upload images for OCR processing.
- View JSON output of processed data.
- View, edit, and delete processed OCR records.
- Filter records based on their status and values search.

## Technologies Used

- MongoDB: Database for storing OCR records.
- Express.js: Backend framework for API handling.
- React.js: Frontend framework for the user interface.
- Node.js: JavaScript runtime environment.
- Google Vision API: For image processing and OCR.
- OpenAI API: For text recognition and extraction.

## Architecture and Folder Structure 
![MVC Pattern Visual](https://www.freecodecamp.org/news/content/images/size/w2000/2021/04/BG.png)
### Client (React+Vite Format)

- **src/**
  - **ApiCalls/**
    - `index.js` # API calls for requesting backend API

### Backend

- **services/**
  - `ExtractionOpenSpec.js` # OpenAI Logic for extracting OCR processed text by Google Vision API

- **controllers/**
  - `AllOcrRecords.js` 
  - `CreatePcrRecords.js`
  - `EditOcrRecords.js`
  - `SoftDelete.js`

- **models/**
  - `index.js` # Mongoose model for Thai ID Card

- **routes/**
  - `index.js` # Routes for Thai ID Card operations

- `.env` # Environment variables (ensure this is added to .gitignore)
- `.gitignore` # Git ignore file
- `server.js` # Middlewares and configuration for the API  
- `index.js` # Main entry point for the Express app
- `package.json`
- `README.md`

## API ENDPOINTS
- GET /api/thaiIDCards: Get all OCR records.
- POST /api/thaiIDCards/create: Upload an image for OCR processing.
- GET /api/thaiIDCards/delete/:id: Delete an OCR record.
- POST /api/thaiIDCards/edit/:id: Update an OCR record.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sourabhjo7/Thai-ID-OCR-assignment
   cd Thai-ID-OCR-assignment

2. **Install dependencies:**
  # Install server and then client dependencies
    ```bash
    cd backend/
    npm install
    cd ../client
    npm install

3. **SETUP ENVIRONMENT VARIABLES:**

# Create a .env file in the server directory and set the following environment variables:
- MONGOURI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
- OPENAI_API_KEY=your_openai_api_key
# Add Google Vision API key in the client side env seperatly .

4. **Start the development server:**
# Start the server
cd ../backend
npm start

# Start the client
cd ../client
npm start

# note:- Configuration of cors might need editing according to the ports use to run locally 



# Recap
 - This project implements an OCR (Optical Character Recognition) Management System using the MERN stack. It provides functionalities to upload images, perform OCR using Google Vision and OpenAI, display, and manage the extracted data.