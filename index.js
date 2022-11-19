const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const productsRouter = require("./routes/productRoutes");
const usersRoute = require('./routes/userRoutes')
const otpRoutes = require('./routes/otpRoutes')
require("dotenv").config();

// middlewares
app.use(express.json());
app.use(cors());

let port = process.env.PORT || 4000;
let mongoConnectionString =
  process.env.MONGO_URI ||
  "mongodb://sixsensemobility:Wbkyfma36VS2vR5Hmw3m0BAxKdRjml2FNSBXRiDvi4iv2hz1de3cBvrdhWPQWr9zTDmg8wZWtrQUACDbkBLslg==@sixsensemobility.mongo.cosmos.azure.com:10255/dashboard?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@sixsensemobility@";

app.listen(port, () => console.log(`app is listening on port ${port}`));
mongoose.connect(mongoConnectionString, () => console.log("DB Connected!"));

// initial route
app.get("/", (req, res) => {
  res.json({
    greeting:
      "Welcome to SixSenseMobility. , visit /api/products to access apis.",
  });
});

// serve the upload directpory as a static folder
const path = require("path");
app.use("/static", express.static(path.join(__dirname, "uploads")));

// routes define here 
app.use("/api/products", productsRouter);

app.use('/api/users' , usersRoute)

app.use('/api/otp',otpRoutes)

