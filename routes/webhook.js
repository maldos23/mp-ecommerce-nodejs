const { Router } = require("express");
const router = Router();
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

router.post("/reciver", async (req, res) => {
  /*
        Creo notificacion con servicio de email de todos los contactos del webhook 
        el cual cachara unicamente la respuesta de mercadopago de una manera didactica
        para el examen.
    */
  const emailServices = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPWD,
      },
    })
  );
  //Creo contenido de email de notificacion del web hook
  const emailContent = {
    from: process.env.EMAILUSER,
    to: process.env.EMAILUSER,
    subject: "NOTIFICACION DE CORREO WEBHOOK",
    html: JSON.stringify(req.body),
  };

  emailServices.sendMail(emailContent, (error) => {
    if (error) {
      console.error("Error al enviar correo", error);
    }
  });

  res.status(200).json("ok");
});

//Exporto rutas
module.exports = router;
