import app from "./app.js";
import connect from "./config/connection.js";
app.get("/", (req, res) => {
  res.send("Hello");
});

const port = 3000;

connect();

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
