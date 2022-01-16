const fs = require('fs').promises
const path = require('path')
const bodyParser = require('body-parser')

const express = require('express')
const fileUpload = require('express-fileupload')

const ImageModel = require('../models/Image')
const { getFileFormat, acceptedFormats } = require('../util')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload({
  useTempFiles: false,
  uploadTimeout: 60000,
  limits: {
    fileSize: 20 * 1024 * 1024 * 1024
  }
}))

// serve uploaded images
app.use('/data/images', express.static(path.join(__dirname, '/data/images')))

// endpoint for existing pictures
app.get('/get-pictures', async function (req, res) {
  try {
    const data = await fs.readFile(path.join(__dirname, '/data/data.json'))
    const imageData = JSON.parse(data)
    res.status(200).send({
      success: true,
      message: 'data fetched',
      body: imageData.images
    })
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'error opening file',
      body: {}
    })
  }
})

app.post('/upload-picture', async (req, res) => {
  try {
    if (!req.files) {
      res.status(403).send({
        success: false,
        message: 'no image uploaded'
      })
    } else {
      const picture = req.files.picture

      if (!acceptedFormats.includes(getFileFormat(picture.name))) {
        res.status(403).send({
          success: false,
          message: 'file uploaded was not an image',
          body: {}
        })
      }

      if (!req.body.name) {
        res.status(403).send({
          success: false,
          message: 'name was not provided',
          body: {}
        })
      }

      const img = new ImageModel(req.body.name, picture, req.body.desc)

      if (!img.move()) {
        res.status(500).send({
          success: false,
          message: 'image could not be saved',
          body: {}
        })
      }

      const imageName = await img.save(path.join(__dirname, '/data/data.json'))

      res.status(200).send({
        success: true,
        message: 'image uploaded',
        body: {
          url: `/api/data/images/${imageName}`
        }
      })
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'server error',
      body: {}
    })
  }
})

export default {
  path: '/api',
  handler: app
}
