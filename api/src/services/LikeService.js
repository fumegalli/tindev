const Dev = require('../models/Dev')

module.exports = {
    async create(req) {
        const { devId } = req.params
        const { user } = req.headers
        const { connectedUsers, io } = req

        const loggedDev = await Dev.findById(user)
        const targetDev = await Dev.findById(devId)

        if (!targetDev) {
            throw new Error('Dev not found')
        }

        if (targetDev.likes.includes(loggedDev._id)) {
            const loggedSocket = connectedUsers[user]
            const targetSocket = connectedUsers[devId]

            if (loggedSocket) {
                io.to(loggedSocket).emit('match', targetDev)
            }

            if (targetSocket) {
                io.to(targetSocket).emit('match', loggedDev)
            }
        }

        loggedDev.likes.push(targetDev._id)

        return loggedDev.save()
    },
}
