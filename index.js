const express = require("express");
const cors = require("cors");

const routes = require("./routes/routes");

// initialize the app
const app = express();

// cors
app.use(cors());

// PORT
const PORT = process.env.PORT || 3000;

// routes
app.use("/api", routes);

// start the server
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
