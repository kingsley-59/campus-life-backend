const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 3030;
app.use(cors());
app.use(express.json());

const { routeManager } = require("./routes/rts.js");
const { userRoute } = require("./routes/userRoutes.js");
// const { lodgeRoute } = require("./routes/lodgeRoutes.js");

app.use("/", routeManager);
app.use("/users", userRoute);
// app.use("/lodges", lodgeRoute);

app.listen(PORT, () => {
  console.log(
    `CampusLife server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
