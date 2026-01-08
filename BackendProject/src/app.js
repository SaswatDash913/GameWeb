import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/User.router.js';
import adminRouter from './routes/Admin.router.js';  
import gameRouter from './routes/Gameup.router.js'
import orderRouter from './routes/Order.router.js'
import paymentrouter from "./routes/Payment.router.js";
import reviewRouter from "./routes/Review.router.js"

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/ver1/user", userRouter);
app.use("/api/ver1/admin", adminRouter)
app.use("/api/ver1/game",gameRouter)
app.use("/api/ver1/order",orderRouter)
app.use("/api/ver1/payment",paymentrouter)
app.use("/api/ver1/review",reviewRouter)


export { app };
