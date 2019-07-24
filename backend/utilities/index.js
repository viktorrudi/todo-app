const jwt = require('jsonwebtoken')
const log = require('./logger')

module.exports = {
  // Validation of the user is done by checking a token signed with jwt containing the users ID.
  // The users ID is otherwise available to the user, but the point is to match it to the secret
  validateUser: (req, res, next) => {
    jwt.verify(
      // Access token collected from browser cookies
      req.headers['x-access-token'],
      req.app.get('secretKey'),
      async (err, decoded) => {
        try {
          req.body.userId = await decoded.id
          next()
        } catch (err) {
          log.error('Error validating user:', err)
          next(err)
        }
      }
    )
  },
}


// function cleanseError(err) {
//   // handle if err is not passed in :'(

//   // this function would maintain a consistent format so you can safely call 
//   // err.response.status anywhere once you pass it via this function
//   const somedefaultstatus = 200; // probably not a 200 :)
//   return Object.assign({}, { response: { status: somedefaultstatus } }, err);

//   // you can also mutate the output to conform to this contract even if the input doesn'
//   // then all your calling against errors is consistent and maintained in this one place
//   // a strategy pattern would also help against multiple input formats to mutate the output
// }

// // then call it anywhere safely with:
// const status = cleanseError(err).response.status;