import Joi from '@hapi/joi'
import objectId from 'joi-objectid'
import { checkValidation } from './utils.js'

const objectIdValidator = objectId(Joi)

export const createBlogValidation = (req, res, next) => {
  const { title, body, author, date } = req.body

  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    author: Joi.string().required(),
    date: Joi.date()
  })
  const data = {
    title,
    body,
    author,
    date
  }
  checkValidation(schema, data)
  next()
}

export const getBlogValidation = (req, res, next) => {
  const { id } = req.params

  const schema = Joi.object({
    id: objectIdValidator()
  })
  const data = {
    id
  }
  checkValidation(schema, data)
  next()
}

export const updateBlogValidation = (req, res, next) => {
  const { id } = req.params
  const { title, body, author, date } = req.body

  const schema = Joi.object({
    id: objectIdValidator(),
    title: Joi.string(),
    body: Joi.string(),
    author: Joi.string(),
    date: Joi.date()
  })
  const data = {
    id,
    title,
    body,
    author,
    date
  }
  checkValidation(schema, data)
  next()
}

export const deleteBlogValidation = (req, res, next) => {
  const { id } = req.params

  const schema = Joi.object({
    id: objectIdValidator()
  })
  const data = {
    id
  }
  checkValidation(schema, data)
  next()
}