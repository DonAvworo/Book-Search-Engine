const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({req}) {               //remove next and response from parameters and wrap req with the curly braces
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      // return res.status(400).json({ message: 'You have no token!' });
      return req
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      // return res.status(400).json({ message: 'invalid token!' }); //refer to line 19 for the change
    }

    return req;     //return the request object so it can be passed to the resolver as `context` // refer to line 19  and 29 for the change

    // send to next endpoint
    // next();        //remove next() since we are not using it anymore and we are not passing it as a parameter anymore  // refer to line 19, 29 and 32 for the change
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
