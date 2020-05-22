const router = require('express').Router();
let Item = require('../../models/Item');
const auth = require('../../middleware/auth');


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
// @access  Private
router.route('/').post(auth,(req, res) => {
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
// @access  Private
// respon w/ 404 if there's no data
router.route('/:id').delete(auth,(req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then( () => res.json({success: true}))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;