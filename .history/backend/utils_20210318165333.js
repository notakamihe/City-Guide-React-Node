const Place = require('./models/Place')

module.exports.averageRating = (arr) => {
    if (arr.length === 0)
        return null

    const ratingsList = arr.map(r => r.rating)
    return ratingsList.reduce((a, b) => a + b) / ratingsList.length;
}

module.exports.numberOfReferences = async (id) => {
    (await Place.find({ tags: { "$in" : id} })).length
}