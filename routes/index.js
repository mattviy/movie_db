const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser())

router.get('/', (req, res) => {
    var Cookies = req.cookies;
    if (Cookies.loggedIn === undefined) res.redirect('/user/login');
    else 
    res.render('index', {title: "testpage", loggedIn: true})
});

module.exports = router; 