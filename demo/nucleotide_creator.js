const fs = require('fs')
const file = fs.createWriteStream('./nucleotides_big')

for (let i = 0; i <= 1e6; i++) {
  file.write('AAGTACGTGCAGTGAGTAGTAGACCTGACGTAGACCGATATAAGTAGCTA')
}

file.write('ε')
file.end()
