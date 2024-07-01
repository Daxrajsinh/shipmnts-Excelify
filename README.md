# Excelify

Excelify is a web application built with Node.js, Express, MongoDB, and EJS, designed to upload Excel sheets, visualize data, and store it in a MongoDB database.

## Features

- **Upload Excel Sheets**: Upload Excel files (.xls, .xlsx) containing company and contact data.
- **Visualize Data**: Display uploaded company and contact data in tabular format on the web interface.
- **Store in Database**: Store the uploaded data persistently in MongoDB.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Frontend**: EJS (Embedded JavaScript), Bootstrap
- **File Handling**: Multer, XLSX (Excel library)
- **Database**: MongoDB

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/excelify.git
   cd excelify

2. **Install Dependencies:**
   ```bash
   npm install

3. **Set up environment variables:**
   Create a .env file in the root directory and add the following:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   PORT=3000

4. **Run the application:**
   ```bash
   npm start

## Usage
Upload Companies Excel File:
  - Click on "Upload Excel File for Companies" card.
  - Choose an Excel file (.xls or .xlsx) containing company data.
  - Click "Confirm" to upload and visualize company data.

## Upload Contacts Excel File:
  - Click on "Upload Excel File for Contacts" card.
  - Choose an Excel file (.xls or .xlsx) containing contact data.
  - Click "Confirm" to upload and visualize contact data.

## View Uploaded Data:
  - Uploaded company and contact data will be displayed in separate tables on the homepage.

## Bonus implementation
  - Ensure compatibility with different Excel versions (.xls and .xlsx).
  - Consider security aspects such as file size limits, file type validation, and sanitization of user inputs
