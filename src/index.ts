import { createApp } from "./app";
import { PORT } from "./config";

for (const sig of ["SIGTERM", "SIGINT"]) {
    process.on(sig, ()=>{
        console.error(`Received ${sig}, exiting`);
        process.exit(0);
    });
}

const app = createApp();
app.listen(PORT, (error) => {
    if (error != null) {
        console.error(error);
    }
    else {
        console.log("Listening on http://localhost:" + PORT);
    }
});
