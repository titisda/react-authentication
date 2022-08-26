import express from "express";
import db from "./src/db";
import { routes } from "./src/routes/index";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

db.connect().then(() => {
  app.listen(8080, () => {
    console.log("server is up!");
  });
});