import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import logger from "morgan";

import route from "./routes/index.js";
import sequelize from "./database.js";

let port = process.env.PORT || 3000;

function app() {
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(json({ limit: "20mb" }));
    app.use(urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(logger("dev"));

    route(app);
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

sequelize.sync({ logging: false }).then(() => {
    console.log("Connect DB successfully");
    app();
});
