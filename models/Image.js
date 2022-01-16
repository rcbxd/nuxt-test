/* eslint-disable space-before-function-paren */
/* eslint-disable object-shorthand */
const path = require('path')
const fs = require('fs').promises
const { v4 } = require('uuid')

const { getFileFormat } = require('../util')

class ImageModel {
  constructor(name, pictureObject, desc) {
    this.name = name
    this.id = v4()
    this.desc = desc
    this.pictureObject = pictureObject
    this.fileUrl = path.join(__dirname, `/../api/data/images/${this.id}.${getFileFormat(pictureObject.name)}`)
    this.url = `${this.id}.${getFileFormat(this.pictureObject.name)}`
  }

  move() {
    try {
      this.pictureObject.mv(this.fileUrl)
      return true
    } catch {
      return false
    }
  }

  async save(fileLocation) {
    const data = await fs.readFile(fileLocation)
    const imageData = JSON.parse(data)

    const { name, desc, id, url } = this

    const newImage = {
      title: name,
      desc: desc,
      url: `/data/images/${url}`,
      id: id
    }

    imageData.images = [...imageData.images, newImage]

    await fs.writeFile(fileLocation, JSON.stringify(imageData))

    return url
  }
}

module.exports = ImageModel
