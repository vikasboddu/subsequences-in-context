let fs = require('fs')

let nucleotideModel = require('../models/nucleotide.model.js')

module.exports = (app) => {
  app.post('/nucleotide', (req, res) => {
    let source = req.body.source
    let target = req.body.target
    let precedingContextCount, succeedingContextCount

    if ((!req.body.precedingContextCount) || (req.body.precedingContextCount < 0)) {
      precedingContextCount = 0
    } else {
      precedingContextCount = req.body.precedingContextCount
    }

    if ((!req.body.succeedingContextCount) || (req.body.succeedingContextCount < 0)) {
      succeedingContextCount = 0
    } else {
      succeedingContextCount = req.body.succeedingContextCount
    }

    processNucleotideStream(source, target, precedingContextCount, succeedingContextCount, (err) => {
      if (err) throw err
      res.send('Done with stream.')
    })
  })
}

function processNucleotideStream (source, target, precedingContextCount, succeedingContextCount, cb) {
  let precedingContextBuffer = []
  let targetBuffer = []
  let nucleotides = []

  let readable = fs.createReadStream(source, {
    encoding: 'utf8',
    fd: null
  })

  readable.on('readable', (chunk) => {
    while ((chunk = readable.read(1)) !== null) {
      nucleotides.forEach((nb) => {
        nb.addSucceedingContext(chunk)
      })

      nucleotides = nucleotides.filter((nb) => {
        return !nb.printed
      })

      targetBuffer.push(chunk)
      if (targetBuffer.length > target.length) {
        precedingContextBuffer.push(targetBuffer.shift())
      }

      if (precedingContextBuffer.length > precedingContextCount) {
        precedingContextBuffer.shift()
      }

      if (targetBuffer.join('') === target) {
        nucleotides.push(new nucleotideModel.NucleotideBuffer(target, precedingContextCount,
          succeedingContextCount, precedingContextBuffer.join('')))
      }
    }
  })

  cb()
}
