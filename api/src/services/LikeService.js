const Dev = require('../models/Dev')

module.exports = {
    async create(loggedDevId, targetDevId) {
        const loggedDev = await Dev.findById(loggedDevId)
        const targetDev = await Dev.findById(targetDevId)

        if (!targetDev) {
            throw new Error('Dev not found')
        }

        if (targetDev.likes.includes(loggedDev._id)) {
            console.log('DEU MATCH')
        }

        loggedDev.likes.push(targetDev._id)

        return loggedDev.save()
    }
}
