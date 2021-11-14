const PORT = 8000;

const express = require("express");

const app = express();

require("./routes/routes.js")(app)

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
app.use(express.static('public'));
