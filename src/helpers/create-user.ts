import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { User } from "./types";
import { isUserValid } from "./validation";

const dataFilePath = path.resolve("data.json");

export const createUser = (req: Request, res: Response) => {
    const {name, age, gender} = req.body;

    const {errorMessage, isValid} = isUserValid(name, age, gender);

    if (!isValid) {
        res.status(400).send(errorMessage);
        return;
    }

    const user: User = {
        id: Math.random() * 100000000000000000,
        name,
        age,
        gender,
        status: false,
        creationTimestamp: new Date().toISOString(),
        modificationTimestamp: ""
    }

    let users: Array<User> = [];

    const data = fs.readFileSync(dataFilePath, "utf-8");

    if (data) {
        users = JSON.parse(data);
    }

    users.push(user);

    fs.promises
        .writeFile(dataFilePath, JSON.stringify(users, undefined, 2))
        .then(() => {
            res.send("User is created!");
        })
}