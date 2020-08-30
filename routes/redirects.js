const { Router } = require("express");
const router = Router();

router.get("/success_pay", async (req, res) => {
  res.render("payments/success", req.query);
});

router.get("/pending_pay", async (req, res) => {
  res.render("payments/success", req.query);
});

router.get("/failure_pay", async (req, res) => {
  res.render("payments/success", req.query);
});

//Exporto rutas
module.exports = router;
