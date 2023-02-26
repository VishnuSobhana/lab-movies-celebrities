const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/movies.model");

const router = require("express").Router();

//       "/movies/"
//      /localhost3000/movies
router.get("/", async (req, res) => {
  try {
    const allmovies = await Movie.find();
    res.render("movies/movies", { allmovies });
  } catch (error) {
    next(error);
  }
});

router.get("/create", async (req, res) => {
  const allCelebrities = await Celebrity.find();

  res.render("movies/new-movie", { allCelebrities }); //sending the allCelebriteis to the HBS file
});

router.post("/create", async (req, res) => {
  const movies = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };
  try {
    await Movie.create(movies);

    res.redirect("/movies");
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  /*
req.body => get information from one form
req.query => get information from your query in the url
req.params = get information about your ID from the url
*/
  try {
    const { id } = req.params;

    console.log(id);

    const movieFound = await Movie.findById(id).populate("cast");
    console.log(movieFound);

    res.render("movies/movie-details", { movieFound });
  } catch (error) {
    console.log(error);
  }

  //          /movies/delete/:id
  router.post("/delete/:id", async (req, res) => {
    const { id } = req.params;

    const deleteMovie = await Movie.findByIdAndDelete(id);
    res.redirect("/movies");
  });
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  console.log("the id on the edit route", id);
  const editMovie = await Movie.findById(id);
  res.render("movies/edit-movie", { editMovie });
});
//you render HBS files
router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, genre, plot } = req.body;

  await Movie.findByIdAndUpdate(id, { title, genre, plot });

  res.redirect("/movies");
  // you redirect to other url, to ther route
});

module.exports = router;
