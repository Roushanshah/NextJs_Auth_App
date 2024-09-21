import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendMail = async({email, emailType, userId}:any) => {
    try{
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set:{verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 360000}
        })
        } else if(emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set:{forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000}
            })
        }

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            },
          });

        const mailOptions = {
            from: 'raushanpco@gmail.com', 
            to: email, 
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", 
            html: `<p>Click <a href="${process.env.DOMAIN}/verfiyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? 'verify your email' : "reset your password"} or copy and paste the link below in your browser.
            <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
        }

        const mailResponse = await transporter.sendMail(mailOptions)

        console.log(mailResponse)

    } catch(error) {
        //throw new Error(error.message)
        console.log(error)
    }
}