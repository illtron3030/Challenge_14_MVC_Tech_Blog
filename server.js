const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3001;

// sets up an Express.js session and connects the session to our Sequelize database
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//"Super secret secret" should be replaced by an actual secret and stored in the .env file.
// use cookies to set cookie to be {}
const sess = {
    secret: "Super secret secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };
  
  app.use(session(sess));
  
  // Helpers allow us to add small bits of logic or data manipulation to the template itself, like format data (dates, words)
  const helpers = require("./utils/helpers");
  
  const hbs = exphbs.create({ helpers });
  
  app.engine("handlebars", hbs.engine);
  app.set("view engine", "handlebars");
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, "public")));
  
  // turn on routes
  app.use(require("./controllers/"));
  
  // If we change the value of the force property to true,
  // then the database connection must sync with the model definitions and associations.
  // By forcing the sync method to true,
  // we will make the tables re-create if there are any association changes.
  // similarly to DROP TABLE IF EXISTS
  
  // turn on connection to db and server
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
  });