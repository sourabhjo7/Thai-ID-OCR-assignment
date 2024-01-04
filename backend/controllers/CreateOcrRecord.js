//  api/thaiIDCards/create   POST

const ThaiIDCard = require("../models/index");
const extractThaiIDInfo = require("../services/ExtractionOpenSpec");
const CreateOcrRecord = async (req, res) => {
  const { text } = req.body;
  // now we extract text information we need
  try {
    let data = await extractThaiIDInfo(text);
    if (data == null) {
      throw new Error("open AI error ");
    }
    data=JSON.parse(data);
    console.log(data);
    const {
      Identification_Number,
      Name,
      Last_Name,
      Date_of_Birth,
      Date_of_Issue,
      Date_of_Expiry,
    } = data;
    if (
      !Identification_Number ||
      !Name ||
      !Last_Name ||
      !Date_of_Birth ||
      !Date_of_Issue ||
      !Date_of_Expiry
    ) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    if (
      Identification_Number == "NOT FOUND" ||
      Name =="NOT FOUND" ||
      Last_Name == "NOT FOUND" ||
      Date_of_Birth == "NOT FOUND" ||
      Date_of_Issue == "NOT FOUND" ||
      Date_of_Expiry == "NOT FOUND"
    ) {
      const newThaiIDCard = new ThaiIDCard({
        identificationNumber: Identification_Number,
        firstName: Name,
        lastName: Last_Name,
        dateOfBirth: Date_of_Birth,
        dateOfIssue: Date_of_Issue,
        dateOfExpiry: Date_of_Expiry,
        status: "failed",
      });

      await newThaiIDCard.save();
      return res.status(201).json({ success: true, newThaiIDCard });
    }

    const thaiIDRegex = /^[1-8]\d{12}$/;
    if (!thaiIDRegex.test(Identification_Number.replace(/\s/g, ""))) {
      console.log("invalid ID number");
      return res
        .status(200)
        .json({
          success: false,
          error: "Invalid Thai Identification Number format",
        });
    }

    const newThaiIDCard = new ThaiIDCard({
      identificationNumber: Identification_Number,
      firstName: Name,
      lastName: Last_Name,
      dateOfBirth: Date_of_Birth,
      dateOfIssue: Date_of_Issue,
      dateOfExpiry: Date_of_Expiry,
      status: "success",
    });

    await newThaiIDCard.save();
    return res.status(201).json({ success: true, newThaiIDCard });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = CreateOcrRecord;
