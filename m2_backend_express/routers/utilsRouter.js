import {Router} from "express";
import db from "../database/connection.js";
import sendMail from "../util/nodemailer.js";

const router = Router();

router.get("/test", async (req, res) => {
    const user = await db.get('SELECT * FROM users WHERE username = "aaa";')
    res.send({test: user});
});

router.get("/test/session", async (req, res) => {
    console.log("session:" + req.session.username);
    if(req.session.username) {
        res.send({"sessionUsername" : req.session.username});
    } else {
        res.status(401).send({});
    }
});

router.post("/email", async (req, res)=> {
    const url = await sendMail(req.body.from, req.body.subject, req.body.text).catch(console.error);
    if(url) {
        res.send({"url": url});
    } else {
        res.status(416).send({});
    }
})
export default router;