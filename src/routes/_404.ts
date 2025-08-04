import { Router } from "express";

const router = Router();
export default router;

router.all(/^.*$/, (req, res) => {
    res.type("text/plain").status(404).send("404 Not Found");
});