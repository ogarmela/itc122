const express = require("express");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;
const app = express();
const sequelize = new Sequelize(
  "postgres://postgres:secret@localhost:5432/postgres"
);
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:secret@localhost:5432/postgres";
const { Router } = require("express");
const router = new Router();
app.use(bodyParser.json());
app.use(router);

// Using Sequelize, define a model called Movie with the following properties (in addition to an ID):
const Movie = sequelize.define("movie", {
  title: Sequelize.TEXT,
  yearOfRelease: Sequelize.INTEGER,
  synopsis: Sequelize.TEXT
});

//Make sure the model is synched with the database upon startup.
// sequelize.sync({force: true }) // ENABLE TO CLEAR ALL DATA
sequelize
  .sync()
  .then(() => console.log("Tables created successfully"))
  .catch(err => {
    console.error("Unable to create tables, shutting down...", err);
    process.exit(1);
  })

  //Use the model create() method to insert 3 rows of example data.
  .then(() => {
    const movies = [
      {
        title: "Citizen Kane",
        yearOfRelease: 1941,
        synopsis:
          "Following the death of a publishing tycoon, news reporters scramble to discover the meaning of his final utterance."
      },
      {
        title: "The Godfather",
        yearOfRelease: 1972,
        synopsis:
          "Francis Ford Coppola''s epic features Marlon Brando in his Oscar-winning role as the patriarch of the Corleone family. Director Coppola paints a chilling portrait of the Sicilian clan''s rise and near fall from power in America, masterfully balancing the story between the Corleone''s family life and the ugly crime business in which they are engaged. Based on Mario Puzo''s best-selling novel and featuring career-making performances by Al Pacino, James Caan and Robert Duvall, this searing and brilliant film garnered ten Academy Award nominations, and won three including Best Picture of 1972. [Paramount Pictures]"
      },
      {
        title: "Rear Window",
        yearOfRelease: 1954,
        synopsis:
          "A wheelchair-bound photographer spies on his neighbours from his apartment window and becomes convinced one of them has committed murder."
      }
    ];
    const moviePromises = movies.map(movie => Movie.create(movie));
    return Promise.all(moviePromises);
  })
  .catch(console.error);

// create a new movie resource
router.post("/movies/add", (req, res, next) => {
  console.log("what is req.body", req.body);
  Movie.create(req.body)
    .then(movie => res.json(movie))
    .catch(next);
});
// read all movies
//Implement pagination on the "read all" collections resource end-point.
router.get("/movies", (req, res, next) => {
  const limit = req.query.limit || 5;
  const offset = req.query.offset || 0;
  Movie.findAndCountAll({ limit, offset })
    .then(result => res.send({ movies: result.rows, total: result.count }))
    .catch(error => next(error));
});
// read a single movie resource
router.get("/movie/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(params => {
      res.send(params);
    })
    .catch(next);
});
// update a single movie resource
router.put("/movie/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(movie => {
      if (movie) {
        movie.update(req.body).then(movie => res.json(movie));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});
// delete a single movie resource
router.delete("/movie/delete/:id", (req, res, next) => {
  res.send("DELETED"); // -> route works
  Movie.delete({
    where: {
      id: req.params.id
    }
  })
    .then(numDeleted => {
      if (numDeleted) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
