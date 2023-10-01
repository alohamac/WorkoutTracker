import app from "./server.js";

const port = 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
