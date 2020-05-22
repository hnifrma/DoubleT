const router = require('express').Router();
let User = require('../../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// @route   POST api/auth
// @desc    Authenticate new user
// @access  Public
router.route('/').post((req, res) => {
    const { email, password } = req.body;

    //validation
    if(!email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    User.findOne({email})
        .then(user => {
            if(!user)
                return res.status(400).json({msg: 'User does not exist'});

            //hashing password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'});

                    //jwt token
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )
                });
        });
});

// @route   GET api/auth/user
// @desc    GET user data
// @access  Private
router.route('/user').get(auth, (req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;