const LikeService = require('../services/LikeService')

module.exports = {
    async create(req, res) {
        try {
            const loggedDev = await LikeService.create(req)
            return res.status(200).json(loggedDev)
        } catch (err) {
            return res.status(404).json({ msg: err.message })
        }
    },
}
