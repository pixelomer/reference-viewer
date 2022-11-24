import { Router } from "express";
import { IMAGE_DIRS } from "../config";
import fs from "fs";
import path from "path";

const router = Router();
export default router;

const extensions = [ "png", "jpg", "jpeg" ];

let files: string[] = [];

//FIXME: Involves storing the same path in memory thousands of times
//       Not exactly optimized
for (const dirPath of IMAGE_DIRS) {
	const dir = fs.opendirSync(dirPath);
	let entry: fs.Dirent;
	while ((entry = dir.readSync()) != null) {
		if (!entry.isFile()) continue;
		const fileExtension = entry.name.match(/([^.]*)$/)[1].toLowerCase();
		if (!extensions.includes(fileExtension)) continue;
		files.push(path.join(dirPath, entry.name));
	}
	dir.closeSync();
}

console.log("Found", files.length, "images");
export const imagesMax = files.length;

router.get("/images/:imageID([0-9]+)", (req, res) => {
	const imageID = parseInt(req.params.imageID);
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