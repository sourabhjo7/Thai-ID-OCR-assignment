require('dotenv').config(); // Load environment variables from .env file
//importing openAI
const OpenAI = require('openai');
const ThaiIDCard = require('../models');
//setup for OpenAI API for extraction
console.log(process.env.OPENAI_API_KEY,process.env.MONGOURI);
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const extractThaiIDInfo = async (extractedText) => {
  try{
    console.log(extractedText);
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that extracts information from Thai National ID cards.",
        },
        {
          role: "user",
          content: `Analyse the scanned OCR text and provide the following information in JSON format:
        
          **scanned OCR Text:**
          ${extractedText}
        
          **Instructions:**
          1. Review the provided OCR text to extract specified information as described below.
          2. If a field cannot be recognized or found, fill it as "NOT FOUND."
          3. Ensure precision and accuracy in extraction and maintain structured output consistency.
          4. Extract the name, last name, date of birth, date of issue, and date of expiry from the OCR text.
          5. Include any salutation (e.g., Miss, Mr.) found in the text within the name field.
          6. Locate the date of issue, date of birth, and date of expiry based on their respective indicators.
          7. Dates should follow the dd/mm/yyyy format; if the format is inconsistent or incomplete, mark the field as "NOT FOUND."
          8. Verify that each category (name, last name, date-of-birth, date-of-issue, date-of-expiry) is directly followed by the relevant information.
          9. Extract Date_of_Issue appearing just before the text "Date of Issue" and Date_of_Expiry just before "Date of Expiry."
          10. Return the extracted data as a JSON OBJECT adhering strictly to the following structure:
              - Identification_Number: Format should be 1digit 4digits 5digits 2digits 1digit (separated by spaces). If not found or doesn't comply with the rules, fill the field as "NOT FOUND."
              - Name: The term "Name" preceded by any salutation (e.g., Miss, Mr.). If not immediately followed by the term "Name," mark the field as "NOT FOUND."
              - Last_Name: The term "Last name" immediately after the last name. If not immediately followed by the term "Last name," mark the field as "NOT FOUND."
              - Date_of_Birth: dd/mm/yyyy format (if single-digit days or months, prefix with 0). If not found or not in the specified format, mark the field as "NOT FOUND."
              - Date_of_Issue: dd/mm/yyyy format (if single-digit days or months, prefix with 0). If not found or not in the specified format, mark the field as "NOT FOUND."
              - Date_of_Expiry: dd/mm/yyyy format (if single-digit days or months, prefix with 0). If not found or not in the specified format, mark the field as "NOT FOUND."
              - Title_of_the_Card: Thai National ID Card (or any other title mentioned)
        
          11. IMPORTANT: If the OCR text input is "No text detected," return all fields as "NOT FOUND."
          Utilize natural language understanding to identify relevant information from the OCR text in english language .
          `
        }
       
      ],
      model: "gpt-3.5-turbo",
    });
    
    const extractedInfo=completion.choices[0].message.content;
        return extractedInfo;
  } catch(e){
    return null;
  }
    
};

module.exports=extractThaiIDInfo;

const text = `บัตรประจำตัวประชาชน Thai National ID Card
1 1037 02071 81 1
เลขประจำตัวประชาชน
Identification Number
ชื่อตัวและชื่อสกุล น.ส. ณัฐริกา ยางสวย
1
Name Miss Nattarika
Last name Yangsuai
เกิดวันที่ 25 มิ.ย. 2539
Date of Birth 25 Jun. 1996
ศาสนา พุทธ
ที่อยู่ 111/17 หมู่ที่ 2 ต.ลาดหญ้า อ.เมืองกาญจนบุรี
จ.กาญจนบุรี
24 ก.ค. 2553 -
วันออกบัตร
24 Jul, 2020
Date of Issue
from
(นายธนาคม จงจิระ
เจ้าพนักงานออกบัตร
in
24 มิ.ย. 2572
วันบัตรหมดอายุ
24 Jun. 2029
Date of Expiry
160
15
_160
150
40
1398-09-07241719`;

/* 
{
  role: "user",
  content: `Extract the following information from the scanned Thai ID card text:

    **Scanned OCR text:**
    ${extractedText}

    **Information to Extract:**
    - Identification_Number: The Thai National ID number in the required format is a 13 digit number with first digit not zero (if found and valid).
    - Name: The name of the individual as mentioned on the ID card.
    - Last_Name: The last name indicated on the ID card.
    - Date_of_Birth: The date of birth in DD Month YYYY format (e.g., 25 Jun 1996).
    - Date_of_Issue: The date of issue in DD Month YYYY format (e.g., 24 Jul 2020).
    - Date_of_Expiry: The expiry date in DD Month YYYY format (e.g., 24 Jun 2029).

    **Extraction Guidelines:**
    1.  Return the extracted details as a JSON object and only data values of english language not thai.
    2. Locate and structure the extracted information accurately.
    3. Handle date formats consistently as specified (DD Month YYYY) convert it to (DD/MM/YYYY) format .
    4. If any information cannot be located, mark it as "NOT FOUND".
    5.Ensure the validity of the Identification_Number.`,
},
 */