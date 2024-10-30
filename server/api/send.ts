import sgMail from "@sendgrid/mail";

export default defineEventHandler(async () => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log(process.env.SENDGRID_API_KEY);

  //   const msg = {
  //     to: "miltonivan117@gmail.com", // Change to your recipient
  //     from: "Ilopez@edynamicslog.com", // Change to your verified sender
  //     subject: "Sending with SendGrid is Fun",
  //     text: "and easy to do anywhere, even with Node.js",
  //     html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  //   };

  const msg = {
    from: {
      email: "Ilopez@edynamicslog.com",
    },
    personalizations: [
      {
        to: [
          {
            email: "miltonivan117@gmail.com",
            name: "title  learn",
          },
        ],
        dynamic_template_data: {
          name: "Ivan Garcia",
        },
      },
    ],
    subject: "prueba test",
    template_id: "d-1c10dfc3943644b4936ccd90d2d68a4d",

    //  d-1c10dfc3943644b4936ccd90d2d68a4d
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
});
