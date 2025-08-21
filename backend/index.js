import express from "express";
import cookieParser from "cookie-parser";   // so that ..when  browser cookies come from frontend  .... we can parse them and use in backend
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";   // whenever using 'import' syntax ....compulsory to write file extension ..like :- db.js
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";     
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});  // calling empty obj in it .

const app = express();

// Middlewares
app.use(express.json());  // data coming via request will be in json  format
app.use(express.urlencoded({extended:true}));  
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);



app.listen(PORT, () => {
    connectDB();
    // Template Literal
    console.log(`Server running at port ${PORT}`);
})