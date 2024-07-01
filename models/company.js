const mongoose = require('mongoose');

var companySchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    address:String,
    phone:String,
    email:String,
    website:String,
    n_employees:Number,
    founded_date:Date,
    industry_type: {
        type: String,
        required:true,
        enum: ['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Other']
    },
});

module.exports = mongoose.model('Company', companySchema);