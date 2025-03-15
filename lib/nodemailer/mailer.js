import nodemailer from 'nodemailer';

export const sendEmail = async ()=>{
    try {
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: '082da845afc6e3',
              pass: 'b117a1c945aa47'
            }
          });

        const mailOptions ={
            from:'',
            to:"itzshippu@gmail.com",
            subject:"Verify your email",
            html:`<p>Click <a href="/verifyemail?token" >here</a> to </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error) {
        console.log(error.message)
    }
}