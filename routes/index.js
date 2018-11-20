const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    var Cookies = req.signedCookies;
    if (Cookies.loggedIn === undefined) res.redirect('/user/login');
    else 
    res.render('index', {title: "testpage", loggedIn: true})
});

module.exports = router; 