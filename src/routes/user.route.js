import express from 'express'

import {
  signupValidation,
  signinValidation
} from '../validations/user.validation.js'

import {
  signup,
  signin
} from '../controllers/user.controller.js'

const router = express.Router()

router.post('/signup', signupValidation, signup)
router.post('/signin', signinValidation, signin)

export default app => {
  app.use('/users', router)
}