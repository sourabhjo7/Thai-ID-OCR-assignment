// api/thaiIDCards/edit/:id  POST 
const ThaiIDCard = require("../models"); 
 const EditOcrRecord= async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCard = await ThaiIDCard.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json({success:true,updatedCard});
    } catch (error) {
      res.status(400).json({ success:false,error: error.message });
    }
}

  module.exports=EditOcrRecord;
