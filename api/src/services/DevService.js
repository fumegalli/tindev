const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
    async create(username) {
        const userExists = await Dev.findOne({ user: username })

        if (userExists) {
            throw new Error('Dev already exists')
        }

        const response = await axios.get(
            `https://api.github.com/users/${username}`
        )

        const { name, bio, avatar_url: avatar } = response.data

        return Dev.create({
            name,
            user: username,
            bio,
            avatar
        })
    },

    async index(loggedDevId) {
        const loggedDev = await Dev.findById(loggedDevId)

        const { likes, dislikes } = loggedDev

        return Dev.find({
            $and: [
                { _id: { $ne: loggedDevId } },
                { _id: { $nin: likes } },
                { _id: { $nin: dislikes } }
            ]
        })
    }
}
