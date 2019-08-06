const LikeService = require('../services/LikeService')

module.exports = {
    async create(req, res) {
        const { devId } = req.params
        const { user } = req.headers

        try {
            const loggedDev = await LikeService.create(user, devId)
            return res.status(200).json(loggedDev)
        } catch (err) {
            return res.status(404).json({ msg: err.message })
        }
    }
}
