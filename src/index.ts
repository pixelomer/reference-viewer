import { createApp } from "./app";
import { PORT } from "./config";

const app = createApp();
app.listen(PORT, () => {
	console.log("Listening on http://localhost:" + PORT)
});