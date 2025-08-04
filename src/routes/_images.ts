import { Router } from "express";
import { IMAGE_DIRS } from "../config";
import fs from "fs";
import path from "path";
import { glob } from "glob";

const router = Router();
export default router;

const extensions = [ ".png", ".jpg", ".jpeg" ];

let files: string[] = [];

//FIXME: Very inefficient
for (const pattern of IMAGE_DIRS) {
    for (const file of glob.sync(pattern, { nodir: true })) {
        const extension = path.extname(file).toLowerCase();
        if (!extensions.includes(extension)) continue;
        files.push(file);
    }
}

console.log("Found", files.length, "images");
export const imagesMax = files.length;

router.get(/^\/images\/([0-9]+)$/, (req, res) => {
    const imageID = parseInt(req.params[0]);
    if (imageID < imagesMax) {
        fs.createReadStream(files[imageID]).pipe(res);
    }
    else {
        res.status(404).send();
    }
});

router.get("/images/random", (req, res) => {
    if (imagesMax <= 0) {
        res.status(404).send();
        return;
    }
    res.redirect(302, Math.floor(Math.random() * imagesMax).toString());
});