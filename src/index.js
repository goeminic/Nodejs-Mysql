const express = require('express');
const morgan = require('morgan');

//initialilzations
const app = express();

//settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(morgan('dev'));

//Global Variables


//Routes
app.use(require('./routes'));

//Public

//Starting Server
app.listen(app.get('port'), () => {
    console.log('Server in Port', app.get('port'));
});


//quede en 20