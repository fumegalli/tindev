const Dev = require('../models/Dev')

module.exports = {
    async create(req, res) {
        const { devId } = req.params
        const { user } = req.headers

        const loggedDev = await Dev.findById(user)
        const targetDev = await Dev.findById(devId)

        if (!targetDev) {
            return res.status(404).json({ error: 'Dev not found' })
        }

        if (targetDev.likes.includes(loggedDev._id)) {
            console.log('DEU MATCH')
        }

        loggedDev.likes.push(targetDev._id)

        await loggedDev.save()

        return res.status(200).json(loggedDev)
    }
}
