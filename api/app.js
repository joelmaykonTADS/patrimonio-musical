const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const logger = require('morgan');
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(logger('dev'));
// receive allow origins
var corsOptions = {
  origin: "*"
};
// config cors request
app.use(cors(corsOptions))

const db = require("./models/secretaria");
db.sequelize.sync();
require("./routes/documentos/file.routes")(app);

require("./routes/secretaria/igreja.routes")(app);

require("./routes/patrimonio/instrumento.routes")(app);
require("./routes/patrimonio/nome.routes")(app);
require("./routes/patrimonio/tombamento.routes")(app);
require("./routes/patrimonio/marca.routes")(app);
require("./routes/patrimonio/caracteristica.routes")(app);
require("./routes/patrimonio/ano.routes")(app);
require("./routes/patrimonio/componente.routes")(app);
require("./routes/patrimonio/empresa.routes")(app);
require("./routes/patrimonio/origem.routes")(app);



// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;