const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
app.use(cors());

app.listen(PORT, () => {
  console.log(`CampusLife server running on port ${PORT}`);
});
