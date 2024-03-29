const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
const tokenExtractor  = (request,response , next ) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.body.token =  authorization.replace('bearer ', '')
        return next()
    }
    request.body.token =  null
    next()
}
const userExtractor = async(request, response, next ) => {
    if(request.body.token === null) {
        response.status(401).end
    }
    const decodeToken = jwt.verify(request.body.token, process.env.SECRET)
    if (!decodeToken.id) {
        return response.status(401).json( { error: 'token invalid' })
    }
    request.body.user = await User.findById(decodeToken.id)
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}