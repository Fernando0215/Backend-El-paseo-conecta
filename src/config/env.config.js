console.log(process.env.VARIABLE)

module.exports = {
    PORT: process.env.PORT || 3002,
    MONGO_URI: process.env.MONGO_URI,
  }