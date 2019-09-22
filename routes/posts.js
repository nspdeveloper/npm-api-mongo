const express = require('express');
const router = express.Router();
const Posts = require('../module/Posts');



// http://localhost:9000/posts
router.get('/', (req, res) => {
    res.send('post APIs details');
});

// http://localhost:9000/posts/specific
router.get('/add', (req, res) => {
    res.send('should show add schema');
});


//REST APIs
// test in postman..
/*
router.post('/add', (req, res) => {
    //console.log(req.body);
    const post = new Posts({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email
    });
    post
        .save()
        .then(data => {
            res
                .status(200)
                .json({ message: 'accepted' });
        })
        .catch(err => {
            res
                .status(400)
                .json({ message: err });
        })

});
*/
// async add
router.post('/add', async (req, res) => {
    //console.log(req.body);
    const post = new Posts({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email
    });
    try {
        const savePost = await post.save();
        res
            .status(200)
            .json({ message: 'accepted' });
    }
    catch (err) {
        res
            .status(400)
            .json({ message: err });
    }
});
// async get
router.get('/data', async (req, res) => {
    try {
        const data = await Posts.find().limit(5);
        res
            .status(200)
            .json(data);
    }
    catch (err) {
        res
            .status(400)
            .json({ message: err });
    }
});

// async get specific
router.get('/:postid', async (req, res) => {
    try {
        const data = await Posts.findById(req.params.postid);
        res
            .status(200)
            .json(data);
    }
    catch (err) {
        res
            .status(400)
            .json({ message: err });
    }
});

// async delete specific
router.delete('/:postid', async (req, res) => {
    try {
        const data = await Posts.remove({ _id: req.params.postid });
        if (data.deletedCount > 0) {
            res
                .status(200)
                .json({ message: `${req.params.postid} deleted` });
        }
        else {
            res
                .status(400)
                .json({ message: `no record found` });
        }
    }
    catch (err) {
        res
            .status(400)
            .json({ message: err });
    }
});

// async update specific
router.patch('/:postid', async (req, res) => {
    try {
        const data = await Posts.updateOne(
            { _id: req.params.postid },
            {
                $set: {
                    name: req.body.name,
                    lastname: req.body.lastname,
                    email: req.body.email,
                }
            });
        if (data.ok == 1) {
            res
                .status(200)
                .json({ message: `${req.params.postid} updated` });
        }
        else {
            res
                .status(400)
                .json({ message: `no record found` });
        }
    }
    catch (err) {
        res
            .status(400)
            .json({ message: err });
    }
});

module.exports = router;