import mongoose from 'mongoose'

import config from '../config/index.js'

async function setupMongoose () {
  mongoose.Promise = global.Promise
  // Suppress deprecation warning
  mongoose.set('strictQuery', true)
  ;(async () => {
    await mongoose.connect(config.db)
  })()
  const db = mongoose.connection

  db.on('error', err => {
    console.log('MONGOOSE ERR => ', err)
  })

  db.once('open', () => {
    if (process.env.NODE_ENV !== 'test') {
      console.info('CONNECTED TO => ', config.db)
    }
  })

  process.on('SIGINT', () => {
    db.close(() => {
      process.exit(0)
    })
  })
}

export default setupMongoose