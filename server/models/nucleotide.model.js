class NucleotideBuffer {
  constructor (target, precedingContextCount, succeedingContextCount, precedingContext) {
    this.target = target
    this.precedingContextCount = precedingContextCount
    this.succeedingContextCount = succeedingContextCount
    this.precedingContext = precedingContext
    this.succeedingContext = ''
  }

  addSucceedingContext (character) {
    if (this.succeedingContextCount === 0) {
      this.readyToPrint()
    } else {
      this.succeedingContext += character
      this.readyToPrint()
    }
  }

  readyToPrint () {
    if (this.succeedingContext[this.succeedingContext.length - 1] === 'ε') {
      this.succeedingContext = this.succeedingContext.replace('ε', '')
      this.print()
    } else if (this.succeedingContextCount === this.succeedingContext.length) {
      this.print()
    }
  }

  print () {
    if (!this.printed) {
      console.log(this.precedingContext + this.target + this.succeedingContext)
      this.printed = true
    }
  }
}

module.exports.NucleotideBuffer = NucleotideBuffer
