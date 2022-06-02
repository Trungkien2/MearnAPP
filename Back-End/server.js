const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config({ path: "./config.env" });

const app = require("./app");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Kien:fQ59mYN24j3Tb9LM@cluster0.ppikw.mongodb.net/MERN?retryWrites=true&w=majority"
    );
    console.log("susscesfull");
  } catch (error) {
      console.log(error);
      process.exit(1);
  }
};

connectDB()

const PORT = process.env.PORT || 3023

app.listen(PORT, () => {
  console.log(`server is running on port  ${PORT}`);
});
