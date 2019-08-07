const DevService = require('../services/DevService')

module.exports = {
    async create(req, res) {
        const { username } = req.body

        const dev = await DevService.create(username)

        return res.status(201).json(dev)
    },

    async index(req, res) {
        const { user } = req.headers

        const users = await DevService.index(user)

        return res.status(200).json(users)
    },
}
