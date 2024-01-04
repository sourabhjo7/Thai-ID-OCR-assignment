const mongoose = require("mongoose");


// this is mongoose db schema 
const ThaiIDCardSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    identificationNumber: {
      type: String,
      required: true,
      unique: true,
    //   validate: {
    //     validator: function (value) {
    //       // Thai Identification Number validation logic goes here
    //       // This validation is simplified and may not cover all cases
    //       return /^[0-9]{13}$/.test(value);
    //     },
    //     message: "Invalid Thai Identification Number format",
    //   },
    },
    dateOfIssue: {
      type: String,
      required: true,
    },
    dateOfExpiry: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    deleteStatus: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["success", "failed"],
    },
    error:{
        type:[Object],
        default:[]
    }
  },
  { timestamps: true }
);

const ThaiIDCard = mongoose.model("ThaiIDCard", ThaiIDCardSchema);

module.exports = ThaiIDCard;
