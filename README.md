# CashTrack

## Overview
CashTrack is an MVP MERN stack web application that allows users to track their expenses efficiently. Users can register and log in to manage their personal expense records.

### Features
The application consists of three main pages:

- **Add New Expense**
  - Users can add expenses from the current day and previous dates.
  - Each expense entry includes a description, a pre-filled date (defaulting to today for convenience), and the amount.

- **Today's Expenses**
  - Displays all expenses recorded for the current day.
  - Users can edit or delete any expense.
  - The total amount spent today is displayed in the title.

- **History**
  - Lists all expenses sorted chronologically and grouped by month.
  - Users can edit or delete any past expenses.
  - Each month displays the total amount spent.

Additionally, a **currency selection** feature is available in the navigation bar. Currently, this setting is not stored in the database and is for demonstration purposes only.

## Technologies Used
### Backend
- bcrypt
- cors
- express
- jsonwebtoken
- mongoose
- nodemon

### Frontend
- axios
- bootstrap
- date-fns
- jwt-decode
- react
- react-dom
- react-icons
- react-infinite-scroll-component
- react-router-dom

## Installation
To run the project locally, follow these steps:

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the backend folder and add the following variables:
   ```sh
   MONGODB_URI=<your_mongodb_connection_string>
   SECRET_KEY=<your_secret_key>
   SALT_ROUND=<a_number_between_10_and_12>
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm run dev
   ```

## Deployment  
You can test the live version of CashTrack here:  
🔗 [CashTrack Live Demo](https://cashtrack-app.netlify.app/)

> **Note:** On Render.com’s free plan, backend servers go idle after 15 minutes of inactivity. If the app hasn’t been used recently, the first request may take up to one minute to respond.

## Future Enhancements
Potential future improvements include:
- Storing the selected currency in the database per user
- Supporting multiple currencies
- Currency conversion based on real-time exchange rates
- Adding income tracking and extra funds
- Implementing monthly expenses and income tracking

## Contribution
Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## Acknowledgments
This project was developed as part of the **Social Hackers Academy Bootcamp** in collaboration with **Vasili Poulio**. You can check out his profile here: [VasilisPoulios](https://github.com/VasilisPoulios).

## License
This project is open-source under the **Creative Commons Attribution License**. If you use or modify this project, you must provide appropriate credit to the original author.

