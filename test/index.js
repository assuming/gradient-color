import test from 'blue-tape'
import gradient from '../build/index'


test('Generated length should be equal', async t => {
  const arr = gradient([
    '#E5404C',
    '#FD743C',
    '#FD9C3C',
    '#2EA4A8',
    '#47586F'
  ], 23)

  t.is(arr.length, 23)
})

test('Start & end color should be the same', async t => {
  const arr = gradient([
    'rgb(229, 64, 76)',
    'rgb(253, 116, 60)',
    'rgb(253, 156, 60)',
    'rgb(46, 164, 168)',
    'rgb(71, 88, 111)'
  ], 23)

  t.is(arr[0], 'rgb(229, 64, 76)')
  t.is(arr[22], 'rgb(71, 88, 111)')
})

test('Input with colors & stops should work', async t => {
  const arr = gradient([
    {
      color: '#E5404C',
      frac: 0.33
    },
    {
      color: '#FD743C',
      frac: 0.33
    },
    {
      color: '#FD9C3C',
      frac: 0.33
    },
    {
      color: '#2EA4A8'
    },
  ], 23)

  t.is(arr.length, 23)
  t.is(arr[0], 'rgb(229, 64, 76)')
  t.is(arr[22], 'rgb(46, 164, 168)')
})
