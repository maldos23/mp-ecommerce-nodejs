const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");

router.post("/checkout", async (req, res) => {
  try {
    mercadopago.configure({
      access_token: process.env.ACCESS_TOKEN,
    });
    let products = {
      external_reference: "ABC",
      payment_methods: {
        installments: 6,
      },
      notification_url: `${req.headers.host}/api/webhooks/reciver`,
      back_urls: {
        success: `${req.headers.host}/api/payments/success_pay`,
      },
      items: [
        {
          title: req.body.title,
          unit_price: parseInt(req.body.price),
          quantity: parseInt(req.body.unit),
          description: "Multicolor Item",
          picture_url:
            "https://mercadopago-ecommerce-example.herokuapp.com/assets/samsung-galaxy-s9-xxl.jpg",
        },
      ],
    };

    mercadopago.preferences
      .create(products)
      .then(function (response) {
        console.log(response);
        global.id = response.body.id;
        res.redirect(response.body.init_point);
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
