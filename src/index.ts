import express from "express";
import { authMiddleware } from "./middlewares/AuthMiddleware";
import usersRouter from "./routes/users";
import { errorMiddleware } from "./middlewares/ErrorMiddleware";

const app: express.Application = express();

app.use(express.json());

app.use(authMiddleware);

app.use(errorMiddleware)

app.use("/users", usersRouter);

app.listen(process.env.PORT, () => {
    console.log("Server starts!");
    console.log(process.env.API_KEY);
})

