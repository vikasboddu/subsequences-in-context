let expect = require('chai').expect

let nucleotideModel = require('../server/models/nucleotide.model.js')

describe('class NucleotideBuffer', function () {
  let target = 'AGTA'
  let precedingContextCount = 5
  let succeedingContextCount = 7
  let precedingContext = 'ATATA'
  let chunk = 'T'

  it('should create a NucleotideBuffer with given inputs', function (done) {
    let nb = new nucleotideModel.NucleotideBuffer(target, precedingContextCount, succeedingContextCount, precedingContext)
    expect(nb.target).to.equal(target)
    expect(nb.precedingContextCount).to.equal(precedingContextCount)
    expect(nb.succeedingContextCount).to.equal(succeedingContextCount)
    expect(nb.precedingContext).to.equal(precedingContext)
    done()
  })

  it('should add a character to the succeedingContext', function (done) {
    let nb = new nucleotideModel.NucleotideBuffer(target, precedingContextCount, succeedingContextCount, precedingContext)
    nb.addSucceedingContext(chunk)
    expect(nb.succeedingContext).to.equal(chunk)
    done()
  })

  it('should print when succeedingContextCount is 0', function (done) {
    let nb = new nucleotideModel.NucleotideBuffer(target, precedingContextCount, 0, precedingContext)
    nb.addSucceedingContext(chunk)
    expect(nb.printed).to.equal(true)
    done()
  })

  it('should print when the succeedingContext.length === succeedingContextCount', function (done) {
    let nb = new nucleotideModel.NucleotideBuffer(target, precedingContextCount, succeedingContextCount, precedingContext)
    for (let i = 0; i < succeedingContextCount; i++) {
      nb.addSucceedingContext(chunk)
    }
    expect(nb.printed).to.equal(true)
    done()
  })

  it('should print when the succeedingContext is passed an ε', function (done) {
    let nb = new nucleotideModel.NucleotideBuffer(target, precedingContextCount, succeedingContextCount, precedingContext)
    nb.addSucceedingContext('ε')
    expect(nb.printed).to.equal(true)
    done()
  })
})
