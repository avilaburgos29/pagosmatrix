const express = require('express');
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");

const apiRouter = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(compression());
app.use(bodyParser.json());

app.use('/api/pagos', apiRouter);

app.listen(process.env.PORT || '3000', ()=>{

    console.log(`Server is running on port: ${process.env.PORT || '3000'}`);

});