const router = require('express').Router();

router.get('/article', (req, res) => {
    res.status(200).send({
        title: 'title',
        content: 'content'
    });
});

module.exports = router;