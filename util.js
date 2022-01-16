const getFileFormat = (name) => {
  const nameSplitArr = name.split('.')
  return nameSplitArr[nameSplitArr.length - 1]
}

const acceptedFormats = ['jpg', 'img', 'webp', 'gif', 'jpeg']

module.exports = {
  getFileFormat,
  acceptedFormats
}
