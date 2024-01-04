// api/thaiIDCards/ GET

const ThaiIDCard = require("../models");

const AllOcrRecords=async (req, res) => {
    try {
      const thaiIDCards = await ThaiIDCard.find({ deleteStatus: false });
  
      return res.status(200).json({success:true ,thaiIDCards});
    } catch (error) {
      res.status(500).json({ success:false,error: error.message });
    }
  }
  module.exports=AllOcrRecords;