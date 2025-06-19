const nodemailer = require("nodemailer")

const sendConfirmationEmail = async (username, email) =>{

    const messageTemplate = `
     <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Reset Your Password</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      /* Some email clients ignore <style> tags, but this will help in modern clients */
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
    </style>
  </head>
  <body style="margin: 0; padding: 0; background: linear-gradient(to right, #f0f4ff, #ffffff); font-family: 'Inter', sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 50px 0;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
            <!-- Logo -->
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <img src="https://via.placeholder.com/100x40?text=LOGO" alt="Company Logo" style="height: 40px;" />
              </td>
            </tr>
            <!-- Heading -->
            <tr>
              <td align="center" style="padding-bottom: 10px;">
                <h1 style="margin: 0; font-size: 24px; color: #2c3e50;">Mail Confirmation</h1>
              </td>
            </tr>
            <!-- Message -->
            <tr>
              <td style="font-size: 16px; color: #555; line-height: 1.6; padding-bottom: 30px;">
                <p>Hello,</p>
                 <p>Welcome to Sqi College Of Ict ${username}</p>
              <p>This mail is to confirm you as a bonafied student of Sqi.</p>
              </td>
            </tr>
            <!-- Button -->
            <tr>
              <td align="center" style="padding-bottom: 30px;">
              </td>
            </tr>
            <!-- Footer Note -->
            <tr>
              <td style="font-size: 14px; color: #888; line-height: 1.5; padding-bottom: 10px;">
              <p>Welcome to Sqi College Of Ict ${username}</p>
              <p>This mail is to confirm you as a bonafied student of Sqi.</p>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td align="center" style="font-size: 12px; color: #aaa; padding-top: 30px;">
                <p>© 2025 Your Company Name. All rights reserved.</p>
                <p>1234 Your Address, City, Country</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>   `
  const transporter = nodemailer.createTransport({
        auth:{
            user:process.env.USER_EMAIL,
            pass:process.env.USER_PASS
        },
        service:"gmail"
    })

    const mailOptions = {
        from:process.env.USER_EMAIL,
        to:email,
        subject:"Welcome Message",
        html:messageTemplate
    }

    try {
      const sent =  await transporter.sendMail(mailOptions)
      console.log(sent);
      
      if (sent) {
        return "mail sent"
      }
    } catch (error) {
        console.log(error);
        
    }
} 


module.exports = sendConfirmationEmail