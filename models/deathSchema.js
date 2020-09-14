const mongoose = require('mongoose');

const  DeathSchema = new mongoose.Schema({
    patientId: {
        type: Number,
    },
    reported: {
        type: String,
    },
    ageEstimate: {
        type: Number
    },
    gender :{
        type: String
    },
    state: {
        type: String
    },
    status: {
        type: String
    },
})

const Death = mongoose.model('death', DeathSchema);
module.exports = Death