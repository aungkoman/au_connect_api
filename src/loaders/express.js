import express from 'express'
import bodyParser from 'body-parser'

import { checkAuth } from '../middlewares/auth.middleware.js'
import { errorHandler } from '../middlewares/handlers.middleware.js'

import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import glob from 'glob'
import morgan from 'morgan'
import compression from 'compression'
import cors from 'cors'
import { readFileSync } from 'fs'

import redoc from 'redoc-express'

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Read swagger.json file
const swaggerJsonPath = path.join(__dirname, '../docs/swagger.json')
const swaggerJson = JSON.parse(readFileSync(swaggerJsonPath, 'utf8'))

function setupExpress () {
  const app = express()

  app.use(bodyParser.urlencoded({ limit: '10KB', extended: true }))
  app.use(bodyParser.text({ limit: '10KB', extended: true }))
  app.use(bodyParser.json({ limit: '10KB' }))
  app.use(morgan('dev'))
  app.use(compression())
  app.use(
    cors({
      origin: (origin, callback) => {
        return callback(null, true)
      },
      optionsSuccessStatus: 200,
      credentials: true,
      exposedHeaders: '*'
    })
  )

  // shows plain json format
  app.get('/docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.json(swaggerJson)
  })

  // shows swagger format
  app.get(
    '/docs',
    redoc({
      title: 'API Docs',
      specUrl: '/docs/swagger.json'
    })
  )

  app.use('/server-status', (req, res) => {
    res.status(200).json({
      message: 'Server is up and running!'
    })
  })

  // app.use('/api' + '/*', checkAuth)

  const dir = path.join(__dirname, '../routes/*.js')
  const routes = glob.sync(dir.replace(/\\/g, '/'))
  routes.forEach(route => {
    // Dynamically import the route
    import(route).then(module => {
      module.default(app)
    })
  })

  app.use(errorHandler)
  return app
}

export default setupExpress