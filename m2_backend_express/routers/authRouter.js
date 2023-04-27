import {Router} from "express";
import db from '../database/connection.js'
import bcrypt from "bcrypt";

const router = Router();

router.post("/register", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const result = await db.run('INSERT INTO users (username, password) VALUES(' +
        '$username, $password)',
        {
            $username: req.body.username,
            $password: hashedPassword
        });
    const user = await db.get('SELECT * FROM users WHERE username = ?;', req.body.username)
    res.send(user);
});

router.post("/login", async (req, res) => {
    const result = await db.get('SELECT * FROM users WHERE username = $username;',
        {
            $username: req.body.username
        });
    if (result && await bcrypt.compare(req.body.password, result.password)) {
        console.log(true);
        req.session.username = req.body.username;
        console.log(req.session);
        res.send(result);
    } else {
        res.send(req.session);
    }
});

router.get("/logout", (req, res) => {
    console.log("out!");
    req.session.destroy();
    console.log(req.session);
    res.send({message: "out"});
});

export default router;