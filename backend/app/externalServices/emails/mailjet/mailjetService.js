import Mailjet from 'node-mailjet';

const sendEmail = async (sender, recipients, subject, template, customID, cc, bcc) => {
  
  const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_SECRET
  });
  
  const data = {
    Messages: [
      {
        From: sender,
        To: recipients,
        Subject: subject,
        HTMLPart: template,
        CustomID: customID,
        Cc: cc,
        Bcc: bcc
      },
    ],
  };


  return await mailjet
    .post('send', { version: 'v3.1' })
    .request(data)
    .catch((err) => {
      throw new Error("The email has not been sent")
    })

};

export default { 
  sendEmail
}


// const sendEmail = async () => {
//   const data: any = {
//     Messages: [
//       {
        // From: {
        //   Email: "test@gmail.com",
        //   Name: "matt"
        // },
//         To: [
//           {
//               Email: "test@gmail.com",
//               Name: "matt"
//           },
//         ],
//         Subject: "Greetings from Mailjet.",
//         HTMLPart: '<h3>Dear passenger, welcome to Mailjet!</h3><br />May the delivery force be with you!',
//         TextPart: "My first Mailjet email",
//         CustomID: "AppGettingStartedTest"

//       },
//     ],
//   };

//   return await mailjet
//     .post('send', { version: 'v3.1' })
//     .request<any>(data)
//     .then((result) => {
//       console.log(result.body.status)
//     })
//     .catch((err) => {
//       console.log(err.statusCode, )
//     })

// };