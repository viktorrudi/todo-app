const nodemailer = require('nodemailer')
const { mailing } = require('../config')

const resetPasswordMessage = (email, token) => {
  return `
    <p>
    Someone has requested a password reset of your account, ${email}. 
    To reset your password, copy the code below and paste it in the <strong>reset code</strong> field. The code expires in 60 minutes.
    </p>
    <div style="margin-top:20px; background:#5d8aee; padding:15px; width:100%">
      <h2 style="color:#fff; text-align:center">Reset code:</h2>
      <h1 style="color:#fff;font-weight:700; text-align:center;">${token}</h1>
    </div>
    `
}

module.exports = {
  passwordResetRequest: (req, res, token) => {
    const transporter = nodemailer.createTransport({
      service: mailing.service,
      auth: {
        user: mailing.from,
        pass: mailing.password,
      },
    })

    const mailOptions = {
      from: mailing.from,
      to: req.body.email,
      subject: 'Todo - Your password reset code',
      html: resetPasswordMessage(req.body.email, token),
    }

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) return res.status(500).json({ message: err })
      return res.status(200).json({ message: 'Password reset email sent', response })
    })
  },
}
