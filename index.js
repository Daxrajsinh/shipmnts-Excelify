const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const XLSX = require('xlsx');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

//multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
var upload = multer({ storage: storage });

  //set the template engine
app.set('view engine','ejs');

//fetch data from the request
app.use(bodyParser.urlencoded({extended:false}));

//static folder path
app.use(express.static(path.resolve(__dirname,'public')));

const Comapanymodel = require('./models/company');

app.get('/', async (req,res)=>{
    try {
        const companies = await Comapanymodel.find();
        if(companies!=''){
            res.render('home', {result:companies});
        }else{
            res.render('home', {result:{}});
        }
    } catch (error) {
        console.log(error);
    }
});

 app.post('/',upload.single('excel'), async (req,res)=>{
    var workbook =  XLSX.readFile(req.file.path);
    var sheet_namelist = workbook.SheetNames;
    var x=0;
    sheet_namelist.forEach(async element => {
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
        try {
            await Comapanymodel.insertMany(xlData);
        } catch (error) {
            console.log(error);
        }
        x++;
    });
    res.redirect('/');
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));