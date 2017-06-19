const gradient = require('../build/index')

// const arr = gradient([
//   '#E5404C',
//   '#FD743C',
//   '#FD9C3C',
//   '#2EA4A8',
//   '#47586F'
// ], 23)

const arr = gradient([
  {
    color: '#E5404C',
    frac: 0.1
  },
  {
    color: '#FD743C',
    frac: 0.3
  },
  {
    color: '#FD9C3C',
    frac: 0.3
  },
  {
    color: '#2EA4A8',
    frac: 0.3
  },
  {
    color: '#47586F'
  }
], 23)

console.log(arr)