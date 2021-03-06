const express = require('express');
const path = require('path'); 
const app = express();
const port = 3001;
app.use(express.json());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || port,() => {
    console.log(`Listening at port ${port}`);
});

if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}
const uri = 'mongodb+srv://mongo:abc@cluster0.7psvy.gcp.mongodb.net/covid?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('open', () => {
    console.log('Connection successful');
})
const Death =  require('./models/deathSchema');
app.get('/deaths', (req, res) => {
    console.info("Request made")
    Death.find().sort('patientId').exec().then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({err : err});
    })
})