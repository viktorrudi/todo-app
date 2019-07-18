const nodemailer = require('nodemailer')
const { mailing, server } = require('../config')

module.exports = {
  passwordResetRequest: (req, res, user, token) => {
    const transporter = nodemailer.createTransport({
      service: mailing.service,
      auth: {
        user: mailing.from,
        pass: mailing.password,
      },
    })

    console.log(user)

    const mailOptions = {
      from: mailing.from,
      // to: user.email,
      to: 'vrudi91@gmail.com',
      subject: 'Link to reset your password',
      html: `Copy this: <strong>${token}</strong>`,
    }

    console.log(mailOptions)

    console.log('Staring email sending')

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) return res.status(500).json({ message: err })
      res.status(200).json({ message: 'Password reset email sent', response })
    })
  },
}
