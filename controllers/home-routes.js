// These are the home Routes

const router = require("express").Router();
const { Post, Comment, User } = require("../models");

router.get("/", (req, res) => {
    console.log("home-routes")
    Post.findAll({
        include: [User],
    })
        .then((dbPostData) => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));
            console.log(posts)

            res.render("all-posts", { posts });

        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get("/posts/:id", (req, res) => {
    Post.findByPk(req.params.id, {
        include: [
            User,
            {
                model: Comment,
                include: [User],
            },
        ],
    })
        .then((dbPostData) => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });
                console.log(post)

                res.render("single-post", { post });

            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            res. status(500).json(err);
        });
})

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("login");
});

router.get("/signup", (req,res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("signup");
});

module.exports= router;