const mongoose = require('mongoose');

const perfumeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Perfume = mongoose.model('MenPerfume', perfumeSchema);

module.exports = Perfume;
