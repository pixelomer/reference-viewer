import { createApp } from "./app";
import { PORT } from "./config";

const app = createApp();
app.listen(PORT, (error) => {
    if (error != null) {
        console.error(error);
    }
    else {
        console.log("Listening on http://localhost:" + PORT);
    }
});