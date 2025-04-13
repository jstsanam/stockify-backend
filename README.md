# Stockify - Backend 🚀
The backend engine powering Stockify, delivering real-time stock data, secure user authentication, and smooth API integrations.

## 📋 <a name="table">Table of Contents</a>
1. 📝 [About the Project](#about)
2. 🔥 [Features](#features)
3. 🛠️ [Tech Stack](#tech-stack)
4. 📁 [Project Structure](#project-structure)
5. ⚙️ [Installation](#installation)
6. 🌍 [Environment Variables](#envs)
7. 📡 [API Endpoints](#api-endpoints)
8. 📩 [Contact](#contact)

## <a name="about">About the Project 📝</a>
Stockify - Backend is the heart of the Stockify platform, providing high-performance APIs, real-time data processing, and a secure environment for users to interact with stock market data.
- Fetch real-time stock data and analytics.
- Secure user authentication with JWT and password encryption (Bcrypt).
- Scalable and authenticated APIs for user-related operations.

## <a name="features">Features 🔥</a>
- **User Authentication:** JWT-based login/signup and password encryption with Bcrypt.
- **Stock Data API:** Real-time fetching of stock market data and analytics.
- **Database Models:** Schemas for users and stocks.
- **Controller & Service Layer:** Organized logic for API handling and service interaction.
- **Data Validation:** Using Joi/Express Validator for secure data input.

## <a name="tech-stack">Tech Stack 🛠️</a>
- **Backend:** Node.js, Express.js and JavaScript
- **Database:** MongoDB (with Mongoose ORM)
- **Authentication:** JWT (JSON Web Token), Bcrypt
- **Environment Variables:** dotenv for configuration

## <a name="project-structure">Project Structure 📁</a>
```bash
/src
  /config           → Database connection and JWT configuration
  /constants        → Application constants 
  /controllers      → Logic to handle API requests
  /dtos             → Data Transfer Objects for API req/res validation and formatting
  /middlewares      → Authentication, authorization, and validation middleware
  /models           → Mongoose schemas for users, stocks, etc.
  /routes           → API routes for all stock-related functionalities
  /services         → Business logic and database interaction
```

## <a name="installation">Installation ⚙️</a>
1. Clone the repository:
```bash
git clone https://github.com/jstsanam/stockify-backend.git
```
2. Navigate to the project directory:
```bash
cd stockify-backend
```
3. Install dependencies:
```bash
npm install
```
4. Run the application:
```bash
npm start
```

## <a name="envs">Environment Variables 🌍</a>
| Variable Name           | Description                                      | Example Value         |
|-------------------------|--------------------------------------------------|-----------------------|
| PORT                    | Port number for the server                       | 1234                  |
| MONGOPASS               | Passcode of the database server                  | example1234#          |
| SECRET                  | Secret key used to sign JWT tokens               | example1234#          |
| USER_INITIAL_BALANCE    | Default user balance to buy stocks               | 1234                  |

## <a name="api-endpoints">API Endpoints 📡</a>
- **GET** */stocks* - Get Stock Data
- **POST** */auth/signup* - Create a new user account.
- **POST** */auth/signin* - Login with JWT token.
- **GET** */user/profile* - Get user data.
- **PATCH** */user/profile* - Update user data.
- **GET** */user/watchlist* - Get user watchlist.
- **PATCH** */user/watchlist* - Update stock in user watchlist.
- **DELETE** */user/watchlist* - Delete stock from user watchlist.
- **GET** */user/transactions* - Get user transactions.
- **PATCH** */user/transactions* - Update user transactions.

## <a name="contact">Contact 📩</a>
Sanam Yadav - [jstsanam@gmail.com](mailto:jstsanam@gmail.com)  
GitHub: [jstsanam](https://github.com/jstsanam)
