import { Router } from "express";
import { imagesMax } from "./_images";

const router = Router();
export default router;

router.get("/", (req, res) => {
	res.render("homepage", { imagesMax });
});