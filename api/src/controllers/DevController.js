const DevService = require('../services/DevService')

module.exports = {
    async create(req, res) {
        const { username } = req.body

        try {
            const dev = await DevService.create(username)
            return res.status(201).json(dev)
        } catch (err) {
            return res.status(400).json({ msg: err.message })
        }
    },

    async index(req, res) {
        const { user } = req.headers

        const users = await DevService.index(user)

        return res.status(200).json(users)
    }
}
