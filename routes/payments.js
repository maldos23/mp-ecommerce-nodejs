const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");

router.post("/checkout", async (req, res) => {
  try {
    //configuro SDK de mercado de pago
    mercadopago.configure({
      access_token: process.env.ACCESS_TOKEN,
      integrator_id: process.env.INTEGRATOR_ID, //uso integrator dev_24c65fb163bf11ea96500242ac130004 asignado en la capacitacion
    });
    // Opciones de pago con lo requisitos solicitados
    let paymentOptions = {
      payer: {
        name: req.body.name || "",
        surname: req.body.surname || "",
        email: req.body.email || "",
        phone: {
          area_code: req.body.area_code || "",
          number: parseInt(req.body.phone),
        },
        address: {
          zip_code: req.body.cp || "",
          street_name: req.body.street || "",
          street_number: parseInt(req.body.street_number),
        },
      },
      external_reference: "gino.romero.andriano@gmail.com",
      payment_methods: {
        installments: 6,
        excluded_payment_methods: [
          {
            id: "amex",
          },
        ],
        excluded_payment_types: [
          {
            id: "atm",
          },
        ],
      },

      notification_url: `${req.headers.host}/api/webhooks/reciver`,
      back_urls: {
        success: `https://${req.headers.host}/api/redirects/success_pay`,
        pending: `https://${req.headers.host}/api/redirects/pending_pay`,
        failure: `https://${req.headers.host}/api/redirects/failure_pay`,
      },
      items: [
        {
          id: 1234,
          title: req.body.title,
          unit_price: parseInt(req.body.price),
          quantity: parseInt(req.body.unit),
          description: "Dispositivo móvil de Tienda e-commerce",
          picture_url:
            "https://mercadopago-ecommerce-example.herokuapp.com/assets/samsung-galaxy-s9-xxl.jpg",
        },
      ],
    };
    //Creo preferencia de mercadopago
    mercadopago.preferences
      .create(paymentOptions)
      .then(function (response) {

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
