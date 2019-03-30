const express = require('express')
const app = express()
const port = 3000
const Path = require('path');
let CustomerRoute = require('./src/routes/customer');
let bodyparser = require('body-parser');



app.use(bodyparser.json());
app.use(express.static('public'));

// middleware

app.use(CustomerRoute);


app.get('/', (req, res) => res.send('Hello World!'))

//middleware to handle 404
app.use((req,res,next)=>{
 res.status(404).send('Route Not Found')
});

//middleware to handle 500
app.use((err,req,res,next)=>{
    console.log('Error 500',err.stack);
    res.sendFile(Path.join(__dirname,'./public/500.html'))
   });
   

app.listen(port, () => console.log(`Example app listening on port ${port}!`))