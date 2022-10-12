export const registrationConfirmationTemplate = (url) => {

  return "\
<!DOCTYPE html>\
<html>\
  <head>\
    <meta charset='utf-8'>\
    <title>Email Confirmation</title>\
  </head>\
  <body>\
    <p style='color: black;\
              font-size: 20px\
              font-family:Arial, Helvetica, sans-serif;'>Confirmez votre adresse email en cliquant sur le bouton ci-dessous :</p>\
              \
    <button style='background-color: #6142dd; \
                  border-radius: 10px; \
                  font-size: 20px;\
                  padding: 20px;\
                  margin-top: 20px;\
                  font-family:Arial, Helvetica, sans-serif;\
                  border: none'>\
                  <a style='color: white; \
                            text-decoration: none;' href="+ url + ">Confirmer l'email</a> </button>\
  </body>\
</html>\
"
}