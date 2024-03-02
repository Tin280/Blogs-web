const testingRouter = require('express').Router()
const Blog = require('../src/models/Blog')
const User = require('../src/models/user')

testingRouter.post('/reset', async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

module.exports = testingRouter