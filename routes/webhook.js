const { Router } = require("express");
const router = Router();
const nodemailer = require("nodemailer");

router.post("/reciver", async (req, res) => {
  /*
        Creo notificacion con servicio de email de todos los contactos del webhook 
        el cual cachara unicamente la respuesta de mercadopago de una manera didactica
        para el examen.
    */
  const testAccount = await nodemailer.createTestAccount();
  const emailServices = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  //Creo contenido de email de notificacion del web hook
  const emailContent = {
    from: 'foo@example.com', // sender address
    to: "bar@example.com",
    subject: "NOTIFICACION DE CORREO WEBHOOK",
    html: JSON.stringify(req.body),
  };

  let info = await emailServices.sendMail(emailContent);

  console.log("Mensaje enviado: %s", info.messageId);

  console.log("URL: %s", nodemailer.getTestMessageUrl(info));
  res.status(200).json("ok");
});

//Exporto rutas
module.exports = router;
