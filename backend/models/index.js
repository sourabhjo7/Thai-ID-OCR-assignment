const mongoose =require("mongoose");

const ThaiIDCardSchema = new mongoose.Schema({
    citizenId: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          // Thai Citizen ID validation logic goes here
          
          return /^[0-9]{13}$/.test(value);
        },
        message: 'Invalid Thai Citizen ID format',
      },
    },
    fullName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    // You can add more fields as needed
  });
  
  const ThaiIDCard = mongoose.model('ThaiIDCard', ThaiIDCardSchema);
  
  module.exports = ThaiIDCard;