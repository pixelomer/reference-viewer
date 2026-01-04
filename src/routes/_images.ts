import { Router } from "express";
import { IMAGE_DIRS } from "../config";
import fs from "fs";
import path from "path";
import { glob } from "glob";

const router = Router();
export default router;

const extensions = [ ".png", ".jpg", ".jpeg", ".webp", ".avif", ".bmp" ];

let files: string[];

export function getImagesMax() {
    return files.length;
}

function reload() {
    const newFiles: string[] = [];

    //FIXME: Very inefficient
    for (const pattern of IMAGE_DIRS) {
        for (const file of glob.sync(pattern, { nodir: true, follow: false })) {
            const extension = path.extname(file).toLowerCase();
            if (!extensions.includes(extension)) continue;
            newFiles.push(file);
        }
    }

    console.log("[Reload] Found", newFiles.length, "images");
    files = newFiles;
    return newFiles.length;
}

reload();

router.get(/^\/images\/([0-9]+)$/, (req, res) => {
    const imageID = parseInt(req.params[0]);
    if (imageID < files.length) {
        fs.createReadStream(files[imageID]).pipe(res);
    }
    else {
        res.status(404).send();
    }
});

router.get("/images/random", (req, res) => {
    if (files.length <= 0) {
        res.status(404).send();
        return;
    }
    res.redirect(302, Math.floor(Math.random() * files.length).toString());
});

router.post("/api/reload", (req, res) => {
    const count = reload();
    res.send({ count });
})
