const { Router } = require("express");
const router = Router();

router.get("/success_pay",async(req,res) => {
    res.render("payments/success");
});

router.get("/pending_pay",async(req,res) => {
    res.render("payments/success");
});

router.get("/failure_pay",async(req,res) => {
    res.render("payments/success");
});

//Exporto rutas
module.exports = router;