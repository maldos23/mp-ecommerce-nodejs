const { Router } = require("express");
const router = Router();

router.post("/reciver", async(req,res) => {
    console.log(req.body);
});

//Exporto rutas
module.exports = router;