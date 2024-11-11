const express = require("express");
const router = express.Router();
const storeOrUpdateUser = require('../utils/storeOrUpdateUser');

router.get("/", (req, res) => {
    console.log(req.oidc.isAuthenticated());
    res.render("index", { 
        title: "Express Auth", 
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
    })
    // console.log(req.oidc.user, "user 2")
})

router.get("/user/id", async (req, res) => {
    if (!req.oidc || !req.oidc.user) {
        return res.status(401).send('User not authenticated');
    }

    const user = req.oidc.user;
    await storeOrUpdateUser(user); // Call the function to store or update user data

    res.render("index", {
        title: "Express Auth User Id", 
        isAuthenticated: req.oidc.isAuthenticated(),
        user: `${user.sub} ${user.name}`
    });
});


module.exports = router;