const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

//       /celebrites/
// localhost3000/celebrities/
router.get("/", async (req, res) => {
  try {
    const allCelebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { allCelebrities });
  } catch (error) {
    next(error);
  }
});
//       /celebrities/create
//       /localhost3000/celebrities/create
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", async (req, res) => {
  const celebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };
  try {
    const createdCelebrity = await Celebrity.create(celebrity);
    console.log(createdCelebrity);
    res.redirect("/celebrities");
  } catch {}
});

module.exports = router;
