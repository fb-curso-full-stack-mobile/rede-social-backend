import cors from "cors";
import express from "express";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
