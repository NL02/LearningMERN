const router = require('express').Router(); //Need express router because this is a route
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find() //Mongoose finds all the users and is a promise
    .then(users => res.json(users)) //Then it returns the users in json format 
    .catch(err => res.status(400).json('Error: ' + err)); //If error occurs throws it 
})

router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save() //Save the newly created exercise 
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(username => res.json(username))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('Username deleted!'))
        .catch(err => res.status(400).json('Error: '+ err))
})

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username

            user.save()
                .then(() => res.json('Username updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})


module.exports = router;