const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("🧨🧨🧨🧨🧨 서버임~ 🧨🧨🧨🧨🧨");
});

app.listen(PORT, () => {
  console.log(
    `🩸🩸🩸🩸🩸 ${PORT} NODE WEB_SERVER EXPRESS STARTING! 🩸🩸🩸🩸🩸`
  );
});
