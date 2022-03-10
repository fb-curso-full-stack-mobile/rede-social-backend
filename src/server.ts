import base from "./routes/v1/base";
import cors from "cors";
import debug from "debug";
import express from "express";

const log = debug("app:server");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/api/v1", base);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  log(`Server is running at port ${port}`);
});
