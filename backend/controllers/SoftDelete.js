// api/thaiIDCards/delete/:id GET

const ThaiIDCard = require("../models");

const SoftDelete=async (req, res) => {
    try {
      const cardId = req.params.id;
      const thaiIDCard = await ThaiIDCard.findById(cardId);
  
      if (!thaiIDCard) {
        return res.status(404).json({  success:false,error: 'Card not found' });
      }
  
      thaiIDCard.deleteStatus = true;
      await thaiIDCard.save();
  
      return res.status(200).json({ success:true,message: 'Card soft deleted successfully' });
    } catch (error) {
      res.status(500).json({ success:false , error: error.message });
    }
  }

  module.exports=SoftDelete;