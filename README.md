# google-sheets-clone

Google Sheets Clone

A web-based spreadsheet application that mimics core functionalities of Google Sheets, built using React (Frontend), Flask (Backend), and MySQL (Database).

---------------------------------------
 Features
---------------------------------------
 Spreadsheet Interface with Rows & Columns
 Cell Editing and Formatting (Bold, Italic, Underline, Font Size)
 Basic Mathematical Formulas (=SUM(A1:A2), =CONCAT(B1, B2))
 Undo & Redo Functionality
 Multiple Sheets Management (Add, Rename)
 Save & Load Data (Local Storage & MySQL)
 Scrollable Grid (Vertical & Horizontal)

=======================================
 How to Run the Project
=======================================

1.  Clone the Repository
-------------------------
git clone <repository_url>
cd google-sheets-clone

2. connect the XAMPP
--------------------

use the XAMPP for the database 
In phpMyAdmin create new database
database name - google-sheets-db
import the SQL file into the database


3. Backend Setup (Flask + MySQL)
---------------------------------
 Install Dependencies:
pip install -r requirements.txt

 Start the Flask Server:
python app.py

4. Frontend Setup (React + Vite)
---------------------------------
 Install Dependencies:
npm install

 Run the React App:
npm run dev

--> Open http://localhost:5173 in your browser.


=======================================
 Future Improvements
=======================================
- Export & Import as Excel
- Collaborative Editing (Real-time Updates)
- More Advanced Formulas Support

=======================================
 Troubleshooting
=======================================
 If React App Doesn't Start:
   - Check if Vite is installed: npm install -g vite
   - Try: npm run dev

If Backend Doesn't Start:
   - Ensure Python is installed (python --version)
   - Check MySQL is running (mysql -u root -p)

 If MySQL Connection Fails:
   - Verify your database credentials in database.py
   - Check if MySQL server is running

=======================================
 License
=======================================
This project is open-source and can be modified as needed.
