const DislikeService = require('../services/DislikeService')

module.exports = {
    async create(req, res) {
        const { devId } = req.params
        const { user } = req.headers

        try {
            const loggedDev = await DislikeService.create(user, devId)
            return res.status(200).json(loggedDev)
        } catch (err) {
            return res.status(404).json({ msg: err.message })
        }
    }
}
