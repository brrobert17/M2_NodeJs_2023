import express from 'express';
import dotenv from "dotenv/config.js";
import cors from "cors";
import utilsRouter from "./routers/utilsRouter.js";
import session from "express-session";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRouter from "./routers/authRouter.js";

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(helmet());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    //5min expiration time
    cookie: { maxAge: 1000*60*5},
    resave: false
}));

app.use(authRouter);
app.use(utilsRouter);

const server = app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("server running on: " + server.address().port);
});