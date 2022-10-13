export const resetPasswordTemplate = (url) => {

    return "\
  <!DOCTYPE html>\
  <html>\
    <head>\
      <meta charset='utf-8'>\
      <title>Réinitialisez votre mot de passe</title>\
    </head>\
    <body>\
      <p style='color: black;\
                font-size: 20px\
                font-family:Arial, Helvetica, sans-serif;'>Réinitialisez votre mot de passe en cliquant sur le bouton ci-dessous. Ce lien est valable pendant 15 minutes. Si vous n'avez pas demandé à réinitialiser votre mot de passe, merci d'ignorer cet email.</p>\
                \
      <button style='background-color: #6142dd; \
                    border-radius: 10px; \
                    font-size: 20px;\
                    padding: 20px;\
                    margin-top: 20px;\
                    font-family:Arial, Helvetica, sans-serif;\
                    border: none'>\
                    <a style='color: white; \
                              text-decoration: none;' href="+ url + ">Réinitialisez le mot de passe</a> </button>\
    </body>\
  </html>\
  "
  }