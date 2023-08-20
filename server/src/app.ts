import express from "express";
import ProjectRoutes from "./routes/project/project";
import IllustrationRoutes from "./routes/illustration/illustration";
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(ProjectRoutes);
app.use(IllustrationRoutes);
app.listen(process.env.ILLUSTRY_PORT, () => {
  return console.log(`server is listening on ${process.env.ILLUSTRY_PORT}`);
});
