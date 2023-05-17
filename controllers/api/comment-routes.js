// Setup comment routes

const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth.js");


router.post("/", (req, res) => {
    console.log(req.session)
    console.log(req.session.userId)
    Comment.create({...req.body, UserId: req.session.userId })
        .then(newComment => {
            res.json(newComment);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;