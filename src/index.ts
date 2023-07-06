import express, { NextFunction, Request, Response } from "express";
import { createUser } from "./helpers/create-user";
import { getUser } from "./helpers/get-user";
import { activateUser } from "./helpers/activate-user";
import { deleteUser } from "./helpers/delete-user";
import { updateUser } from "./helpers/update-user";

const app: express.Application = express();

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['api-key'];
    
    if (apiKey && apiKey === process.env.API_KEY) {
      next();
    } else {
      res.status(401).json({ error: 'Invalid API key' });
    }
  };
  
app.use(apiKeyMiddleware);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("My CRUD application");
})

app.post("/users", createUser);

app.get("/users/:id", getUser);

app.patch("/users/:id/activate", activateUser);

app.put("/users/:id/edit", updateUser);

app.delete("/users/:id/delete", deleteUser);

app.listen(process.env.PORT, () => {
    console.log("Server starts!");
    console.log(process.env.API_KEY);
})

