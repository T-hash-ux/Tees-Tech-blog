const router = require("express").Router();
const { User } = require("../../models");

router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.userId = dbUserData.dataValues.id;
                req.session.username = dbUserData.dataValues.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
            console.log(dbUserData)

        })
        .catch(err => {
        console.log(err);

        res.status(500).json(err);
    });

});

router.post("/login", (req, res) => {
    console.log(req.body)
    User.findOne({
        where: {
            username: req.body.username
        }
    }) .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user account found!' });
            return;
        }
        console.log(dbUserData)

        const validPassword =dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        console.log(dbUserData.dataValues.id)

        req.session.save(() => {
            req.session.userId = dbUserData.dataValues.id;
            req.session.username = dbUserData.dataValues.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

router.delete("/user/:id", (req, res) => {
    User.destory({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
