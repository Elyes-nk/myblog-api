const app = require("./services/server.service");
const mongoose = require('./services/mongoose.service');

mongoose.dbConnect();
app.start();
