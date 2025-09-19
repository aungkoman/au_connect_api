import mongoose from 'mongoose'

import config from '../config/index.js'

async function setupMongoose () {
  mongoose.Promise = global.Promise
  // Suppress deprecation warning
  mongoose.set('strictQuery', true)
  
  // Connection options for better compatibility
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of default 30s
    socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
  }

  try {
    await mongoose.connect(config.db, options)
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
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    process.exit(1)
  }
}

export default setupMongoose