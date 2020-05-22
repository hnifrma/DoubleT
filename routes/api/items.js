const router = require('express').Router();
let Item = require('../../models/Item');

// @route   GET api/items
// @desc    GET All Items
// @access  Public
router.route('/').get((req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
        .catch(err => res.status(400).json(`Error : ${err}`));
});

// @route   POST api/items
// @desc    POST a Items
// @access  Public
router.route('/').post((req, res) => {
    const newItem = new Item({
        name: req.body.name
        // description: req.body.description,
        // price: Number(req.body.price),
    })
    newItem.save()
        .then((item) => res.json(item))
        .catch(err => res.status(400).json(`Error : ${err}`));
});

// @route   DELETE api/items/:id
// @desc    DELETE a Items
// @access  Public
// respon w/ 404 if there's no data
router.route('/:id').delete((req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then( () => res.json({success: true}))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;