const express = require ("express");
const colors = require ("colors")
const app = express();
const morgan = require ("morgan")
const cors = require ("cors")
const dotenv = require ("dotenv");
const ConnectDB = require("./config/db.js");

//config dotenv
dotenv.config();
//db connection 
ConnectDB();

//middeware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
/// import routes
app.use("/api/v1/test",require("./routes/testroutes.js"))
app.use("/api/v1/auth", require ("./routes/authroutes.js"))
app.use("/api/v1/user",require("./routes/userroutes.js"))
app.use("/api/v1/rest" , require ("./routes/restroutes.js"))
app.use("/api/v1/category", require ("./routes/categoryroutes.js"))
app.use("/api/v1/food",require ("./routes/foodroutes.js"))
//route
app.get("/",(req,res)=>{
    return res.status(200).send("welcome to the server")
});



const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log("server is started".white.bgYellow)
});