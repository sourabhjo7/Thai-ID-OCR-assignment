require("dotenv").config();
//importing server instance
const app = require("./server");
const mongoose = require("mongoose");

// making connection with the database
const { MONGOURI } = process.env;

mongoose
  .connect(MONGOURI)
  .then(console.log("DB Connected Sucessfully!"))
  .catch((error) => {
    console.log("DB Connection Failed!");
    console.log(error);
    process.exit(1);
  });

// listening on server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port==>`, PORT);
});
