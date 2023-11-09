const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('Connecting to Mongo Database')
mongoose.connect(url).then(result => {
  console.log('Connected to:', url)
}).catch(error => {
  console.log('Error connecting to Mongodb URL:', error.message)
})

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3
  },
  number: {
    type: String,
    minlength: 8
  },
  date: Date
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    returnedObject.name = returnedObject.name.toLowerCase()
    delete returnedObject.__v
    delete returnedObject._id
    delete returnedObject.date
  }
})

 module.exports = mongoose.model('Person', personSchema)