import config from "./app/config";

const mongoose = require("mongoose");

// main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(config.database_url);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
