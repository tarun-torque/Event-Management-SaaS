import express from "express";
import prisma from "./DB/db.config";
import { SwaggerUiOptions } from "swagger-ui-express";
import router from "./routes/routes";

const app = express();
app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("running");
});
