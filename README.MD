# 06_berties_33791096 Berties Books App

## Description

The app simulates a small book shop where users can:

* Browse available books
* Search for books
* Add new books (protected by login)
* View bargain books
* Register/login as customers
* See all registered users and the audit log of login attempts
* Check current weather information for a given city
* Access the books data via an API with filtering and sorting

The application includes all the existing routes from previous lab 8 work and now includes these newly added routes:


**Weather Route**

* `/weather` : Displays current weather for a city (uses OpenWeatherMap API).
* Includes form input for city(London,Manchester e.g) and error handling for invalid city names.

**API Routes** (`api.js`)

* `/api/books` : Returns a JSON list of books. Supports:

  * `search` query parameter to filter by book name
  * `minprice` and `maxprice` query parameters to filter by price range
  * `sort` query parameter to sort by `name` or `price`

API Route	Description

GET /api/books	Returns ALL books in JSON format

GET /api/books?search=term	Returns books where the name contains “term”

GET /api/books?minprice=15&maxprice=25	Returns books priced between a user-defined price range

GET /api/books?sort=name	Returns books sorted by name (ascending)

GET /api/books?sort=price	Returns books sorted by price (ascending)


⚙️ **Technologies Used**

* Node.js
* Express.js
* EJS
* MySQL
* HTML / CSS
* bcrypt (for password hashing)
* dotenv (for environment variable management)
* request (for API calls)

💻 Installation 
1.Clone your github repository: git clone <your repositiory link>. 
2.Install dependencies using npm install. 
3.Run node index.js to access the Berties Books App.























