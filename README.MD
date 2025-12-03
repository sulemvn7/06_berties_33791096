## 06_berties_33791096 Lab 9 Berties Books App

## Description

The app simulates a book shop where users can:

* Browse available books
* Search for books
* Add new books (protected by login)
* View bargain books
* Register/login as customers
* See all registered users and the audit log of login attempts
* Check current weather information for a given city
* Access the books data via an API with filtering and sorting

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
The application includes all the existing routes from previous lab 8 work and now includes these newly added routes:

🌤️ Weather Feature
Route: /weather

Fetches current weather using the OpenWeatherMap API

Uses the request module to call the API

Displays weather in a human-friendly format:

Temperature

City name

Humidity

Wind speed 

Includes:

A city input form

Error handling for invalid city names

API key stored securely using .env

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**API Routes** (`api.js`)

All API routes are public—no authentication, as instructed.

Base route: /api/books

✔️ Features:

| Feature                | Example                             | Description                             |
| ---------------------- | ----------------------------------- | --------------------------------------- |
| **Get all books**      | `/api/books`                        | Returns a JSON array of all books       |
| **Search filter**      | `/api/books?search=world`           | Returns books where *name LIKE %world%* |
| **Price range filter** | `/api/books?minprice=15&maxprice=25` | Returns books priced between 15 and 25   |
| **Sorting**            | `/api/books?sort=name`              | Sorts results by book name              |
|                        | `/api/books?sort=price`             | Sorts results by price                  |

✔️ API Behaviour Summary

GET /api/books

Returns all books in JSON.

GET /api/books?search=term

Filters by books containing the search term.

GET /api/books?minprice=X&maxprice=Y

Filters by price between X and Y.

GET /api/books?sort=name

Sorts alphabetically.

GET /api/books?sort=price

Sorts by price (ascending).

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Technologies Used**

* Node.js
* Express.js
* EJS
* MySQL
* HTML / CSS
* bcrypt (for password hashing)
* dotenv (for environment variable management)
* request (for API calls)

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

💻 Installation 
1.Clone your github repository: git clone <your repositiory link>. 
2.Install dependencies using npm install. 
3.Run node index.js to access the Berties Books App.


































