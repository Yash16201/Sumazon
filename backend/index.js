const express = require('express');
const dbConnect = require('./config/dbConnect');
const cors = require('cors')
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");


const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cookieParser = require("cookie-parser");
dbConnect();

const allowedOrigins = ['http://localhost:3000','http://localhost:3001']

app.use(cors({
    origin : function(origin,callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by cors'));
        }
    },
    credentials: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser())

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);


// app.use(notFound)
app.use(errorHandler)


app.use("/", (req,res) => {
    res.send("Hey this is your server");
});

app.listen(PORT, () => {
    console.log(`Backend Server is running at PORT ${PORT}`);
});