import {Setup} from './types'


export const setup: Setup = {
  ball: {
    x: 50,
    y: 50,
    style: {
      normal: 'green',
      highlight: 'red',
    },
    radius: 5,
  },

  bar: {
    x: 50,
    y: 50,
    style: {
      normal: 'blue',
      highlight: 'red',
    },
    width: 40,
    height: 20,
  },

  sounds: [
    {'id': '1', 'name': 'A'},
    {'id': '2', 'name': 'B'},
  ],

  app: {
    canvas: {
      width: 600,
      height: 400
    },
    bpm: 60
  }
};


export default setup;