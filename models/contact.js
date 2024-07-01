const mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:String,
    birth:Date,
    contact_type: {
        type: String,
        required:true,
        enum: ['Primary', 'Secondary', 'Other']
    },
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    }
});

module.exports = mongoose.model('Contact', contactSchema);