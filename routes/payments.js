const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");

router.post("/checkout", async (req, res) => {
  try {
    mercadopago.configure({
      access_token: process.env.ACCESS_TOKEN,
    });
    let products = {
      external_reference: "ABS",
      back_urls: {
        success: "http://localhost:3000/api/payments/success_pay",
      },
      items: [
        {
          title: req.body.title,
          unit_price: parseInt(req.body.price),
          quantity: parseInt(req.body.unit),
        },
      ],
    };
    console.log(req.body);
    mercadopago.preferences
      .create(products)
      .then(function (response) {
        console.log(response.body.sandbox_init_point);

        res.redirect(response.body.sandbox_init_point);
      })
      .catch((error) => {
        throw error;
      });
  } catch (err) {
    res.status(401).json({
      isError: false,
      error: err,
    });
  }
});

//Exporto rutas
module.exports = router;
