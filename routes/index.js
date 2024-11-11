const express = require("express");
const router = express.Router();
const storeOrUpdateUser = require('../utils/storeOrUpdateUser');
const storeOrUpdateRun = require('../utils/storeOrUpdateRun');

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

router.post('/runs', async (req, res) => {
    // if (!req.oidc || !req.oidc.user) {
    //     return res.status(401).send("User not authenticated");
    //   }
    
    const runData = req.body;

    try {
      await storeOrUpdateRun(runData);
      res.status(201).send('Run added successfully');
    } catch (err) {
      res.status(500).send('Error storing run');
    }
});

// Example route to get all runs for a user
router.get('/getRuns/:userId', async (req, res) => {
   console.log('nothing yet')
});



module.exports = router;