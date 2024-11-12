import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './db/dbConnect.js'
import userRouter from '../src/routes/user.route.js'
import companyRoute from '../src/routes/company.route.js'
import jobRoute from '../src/routes/job.route.js'
import applicationRoute from '../src/routes/application.route.js'
dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.use('/app/v1/user',userRouter);
app.use("/app/v1/company", companyRoute);
app.use('/app/v1/jobs',jobRoute);
app.use("/app/v1/application", applicationRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("running on " + PORT)
});