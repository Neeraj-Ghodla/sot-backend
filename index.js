const express = require("express");

// initialize the app
const app = express();

// PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
