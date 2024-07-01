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

// Multer setup
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

var upload = multer({ storage: storage });

// Set the template engine
app.set('view engine', 'ejs');

// Fetch data from the request
app.use(bodyParser.urlencoded({ extended: false }));

// Static folder path
app.use(express.static(path.resolve(__dirname, 'public')));

const CompanyModel = require('./models/company');
const ContactModel = require('./models/contact');

let companies = [];
let contacts = [];

app.get('/', async (req, res) => {
  try {
    companies = await CompanyModel.find();
    contacts = await ContactModel.find();
    res.render('home', { companies, contacts });
  } catch (error) {
    console.log(error);
  }
});

app.post('/upload-companies', upload.single('excel'), async (req, res) => {
  try {
    var workbook = XLSX.readFile(req.file.path);
    var sheet_namelist = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[0]]);
    await CompanyModel.insertMany(xlData);
    companies = await CompanyModel.find();
    res.render('home', { companies, contacts });
  } catch (error) {
    console.log(error);
  }
});

app.post('/upload-contacts', upload.single('excel'), async (req, res) => {
  try {
    var workbook = XLSX.readFile(req.file.path);
    var sheet_namelist = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[0]]);
    await ContactModel.insertMany(xlData);
    contacts = await ContactModel.find();
    res.render('home', { contacts, companies });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
