require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/DBConnect");
const errorHandler = require("./middleware/errrorMiddleware");
const adminRoute = require("./routes/adminRoute");
const roomRoute = require("./routes/roomRoute");

const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({extended:false})); 
app.use(cookieParser());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();

});

app.use(cors(
    {
        origin:["http://localhost:5173"],
        credentials:true,
        optionsSuccessStatus:200,
        methods:"GET, POST, PUT , PATCH, DELETE, HEAD, OPTIONS"
    }
));

app.get("/", (req, res) => {
    res.send("Hello World");
});


app.use ("/admin", adminRoute);
app.use ("/room", roomRoute);

connectDB()


app.use(errorHandler)

// the db should connect befre server 
mongoose.connection.once("open", () => {
    console.log("MongoDB Connected");
});
app.listen(PORT , () => console.log(`server running on port ${PORT}`));