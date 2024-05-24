const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/darks', {
    useNewUrlParser: true
})
    .then(db => console.log('DB IN LIVE'))
    .catch(err => console.log(err));