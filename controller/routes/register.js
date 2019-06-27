// const router = require('express').Router()
// let User = require('../models/user.model')

// // Get all users
// router.route('/').post((req, res) => {
//   const { email, password } = req.body

//   if (email && password) {
//     const newUser = new User()
//     newUser.email = email
//     newUser.password = password

//     newUser
//       .save()
//       .then(savedUser => {
//         res.status(200).json({ message: 'User registered!', savedUser })
//       })
//       .catch(err => {
//         res.status(500).json(err)
//       })
//     return
//   }
//   res.status(400).json({ message: 'missing email and/or password field' })
// })

// module.exports = router
