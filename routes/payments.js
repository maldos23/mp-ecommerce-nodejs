const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");

router.post("/checkout", async (req, res) => {
  try {
    mercadopago.configure({
      access_token: process.env.ACCESS_TOKEN,
    });
    let products = {
        items: [
            {
              title: req.body.title,
              unit_price: req.body.price,
              quantity: req.body.unit,
            }
          ]
    };
    console.log(req.body);
    mercadopago.preferences
      .create(products)
      .then(function (response) {
        console.log(response)
        global.id = response.body.id;
      })
      .catch(function (error) {
        console.log(error);
      });
    res.status(200).json({ isError: false });
  } catch (err) {
    res.status(401).json({
      isError: false,
      error: err,
    });
  }
});

//Exporto rutas
module.exports = router;
