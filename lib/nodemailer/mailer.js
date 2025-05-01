import nodemailer from 'nodemailer';
export const transporter = nodemailer.createTransport({
    host: 'smtp.protonmail.ch',
    port: 587, // or what Bridge says
    secure: false,
    auth: {
      user: 'contact@tirze-fit.com',
      pass: 'DWKEAZDVEZKDS4S8',
    },
    tls: {
      rejectUnauthorized: false, // if self-signed
    }
  });

const enOtpMailBody= `<!DOCTYPE html> <html> <head> <meta charset="UTF-8"> <title>Tirze-Fit: Your Secure Code</title> <style> body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #e3f2fd; margin: 0; padding: 20px;  display: flex; justify-content: center; align-items: center; min-height: 100vh; } .container { max-width: 550px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 6px 16px rgba(0,0,0,0.1); padding: 40px;  text-align: center; } .logo { font-size: 32px;  font-weight: bold; color: #2196f3;  margin-bottom: 15px; } h2 { color: #1e88e5;  margin-top: 0; margin-bottom: 20px; } p { color: #546e7a; line-height: 1.6; margin-bottom: 15px; } .otp-box { display: inline-block; background-color: #e0f7fa; color: #1976d2;  padding: 18px 35px;  font-size: 28px;  letter-spacing: 6px; border-radius: 10px;  margin: 25px 0; font-weight: bold; } .important { font-weight: bold; color: #1565c0; } .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #bbdefb;  font-size: 13px; color: #78909c; } .footer a { color: #1e88e5; text-decoration: none; } .footer a:hover { text-decoration: underline; } </style> </head> <body> <div class="container"> <div class="logo"><img src="https://tirze-fit.com/_next/image?url=%2Fassets%2Flogo.png&w=384&q=75" width="200px" height="70px"/></div> <h2>Your Secure One-Time Password</h2> <p>Hello,</p> <p>Use the following <span class="important">One-Time Password (OTP)</span> to complete your action:</p> <div class="otp-box">{{OTP}}</div> <p>This OTP is valid for the next <span class="important">5 minutes</span> for security reasons.</p> <p><span class="important">Important:</span> Never share this code with anyone. Our team will never ask for your OTP.</p> <p>If you did not request this OTP, you can safely ignore this email.</p> <div class="footer"> <p>Need assistance? Contact us at <a href="mailto:support@tirzefit.com">support@tirzefit.com</a></p> <p>&copy; 2025 Tirze-Fit. All rights reserved.</p> </div> </div> </body> </html>`

const plOtpMailBody= `<!DOCTYPE html> <html> <head> <meta charset="UTF-8"> <title>Tirze-Fit: Twój Bezpieczny Kod</title> <style> body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #e3f2fd; margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; } .container { max-width: 550px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 6px 16px rgba(0,0,0,0.1); padding: 40px; text-align: center; } .logo { font-size: 32px; font-weight: bold; color: #2196f3; margin-bottom: 15px; } h2 { color: #1e88e5; margin-top: 0; margin-bottom: 20px; } p { color: #546e7a; line-height: 1.6; margin-bottom: 15px; } .otp-box { display: inline-block; background-color: #e0f7fa; color: #1976d2; padding: 18px 35px; font-size: 28px; letter-spacing: 6px; border-radius: 10px; margin: 25px 0; font-weight: bold; } .important { font-weight: bold; color: #1565c0; } .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #bbdefb; font-size: 13px; color: #78909c; } .footer a { color: #1e88e5; text-decoration: none; } .footer a:hover { text-decoration: underline; } </style> </head> <body> <div class="container"> <div class="logo"><img src="https://tirze-fit.com/_next/image?url=%2Fassets%2Flogo.png&w=384&q=75" width="200px" height="70px"/></div> <h2>Twój Bezpieczny Jednorazowy Kod</h2> <p>Witaj,</p> <p>Użyj poniższego <span class="important">Jednorazowego Kodu (OTP)</span>, aby dokończyć swoją akcję:</p> <div class="otp-box">{{OTP}}</div> <p>Ten kod OTP jest ważny przez następne <span class="important">5 minut</span> ze względów bezpieczeństwa.</p> <p><span class="important">Ważne:</span> Nigdy nie udostępniaj tego kodu nikomu. Nasz zespół nigdy nie będzie prosić Cię o Twój kod OTP.</p> <p>Jeśli nie prosiłeś o ten kod OTP, możesz bezpiecznie zignorować tę wiadomość.</p> <div class="footer"> <p>Potrzebujesz pomocy? Skontaktuj się z nami pod adresem <a href="mailto:support@tirzefit.com">support@tirzefit.com</a></p> <p>&copy; 2025 Tirze-Fit. Wszelkie prawa zastrzeżone.</p> </div> </div> </body> </html>`

  export const sendOTP = async (to, otp, locale) => {
    console.log("Sending OTP to ",to,otp,locale);
    await transporter.sendMail({
      from: '"Tirze-Fit" <contact@tirze-fit.com>',
      to,
      subject: 'Your OTP Code',
      text: `Your Otp Code is ${otp}`,
      html: locale === 'en' ? enOtpMailBody.replace('{{OTP}}', otp) :plOtpMailBody.replace('{{OTP}}', otp), 
    });
  };
  