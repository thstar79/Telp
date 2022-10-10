<h1 align="center"> telp </h1>

<h5 align="center">  By: <a href="https://github.com/thstar79">Taehoon Kim</a> - <a href="https://telp-app.herokuapp.com/"><i>Live site</i></h5>

### Table of Contents1
- [We value your Input](#stories)
- [Comments](#comments)
- [Coins](#coins)
- [Conclusion](#conclusion)


## We value your thoughts
Telp is a site where you share your experirence about restaurants, company, whatever you want.

#### Key Features
- Register a business
- Post reviews

#### Technology used
- JavaScript
- HTML
- CSS
- Postgres
- Node.Js 
   - Express
   - Sequelize
   - React
   - Redux
   - bcrypt
  
  
#### How to use our application
 
Below is the step-by-step to install and initiate the program.
   - This will install following dependencies...
            bcrypt
            Cookie-parser / Csurf
            Express
            Morgan
            Pg
            React
            Redux
            Sequelize / Sequelize-cli
            dotenv / per-env
            Nodemon (Node version should be v16)
  
  1. git clone https://github.com/thstar79/Telp.git
  
  2. Install NPM packages
  
             npm install
  3. Create/Update your .env in root folder (use .envexample for reference)
  
             PORT=
             DB_USERNAME=
             DB_PASSWORD=
             DB_DATABASE=
             DB_HOST=
  
  4. Initialize Sequelize package to create the necessary files to use Sequelize
            
             npx sequelize init
  
  5. Create the user in Postgres and give it the necessary privilege (using credential variables in .env).
  
            CREATE USER <<username>> WITH PASSWORD <<password>> CREATEDB;
  
  6. Create and seed the database and tables
  
             npx dotenv sequelize db:create
             npx dotenv sequelize db:migrate
             npx dotenv sequelize db:seed:all
  
  7. Start the server using below command in your terminal.
  
             npm start
  
   
## Businesses
 This application allows for any client to get the information about the businesses posted by registered users. Registered users can also write, edit and delete the business they create. 

## Reviews
Leave reviews about your favorite restaurants, company, etc.
- Dynamically Created Reviews
- Read Reviews
- Dynamically Update Reviews
- Dynamically Delete Reviews
=======
    *Login required
    *
- Read Reviews
    *Anyone can read
- Update Reviews
    *Only the user who wrote review can update.
- Delete Comments
    *Only the user who wrote review can update.
