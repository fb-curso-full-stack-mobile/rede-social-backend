import cors from "cors";
import debug from "debug";
import express from "express";

const log = debug("app:server");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

const port = process.env.PORT || 3001;

app.listen(port, () => {
  log(`Server is running at port ${port}`);
});
