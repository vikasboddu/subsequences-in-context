let request = require('request')

request.post({
  headers: { 'content-type': 'application/json' },
  url: 'http://localhost:3000/nucleotide/',
  json: { source: '/Users/vboddu/WebstormProjects/subsequences-in-context/demo/nucleotides_small',
    target: 'AGTA',
    precedingContextCount: 5,
    succeedingContextCount: 7 }
}, function (error, response, body) {
  if (error) throw error
  // console.log(response)
  // console.log(body)
})
