export enum ObjectStyle {
  normal = 'normal',
  highlight = 'highlight',
}

export enum EditMode {
  draw = 'draw',
  move = 'move',
  none = 'none',
}

export interface Sound {
  id: string;
  name: string;
}

export interface Canvas {
  width: number;
  height: number;
}
export interface Setup {
  ball: {
    x: number,
    y: number,
    style: {
      normal: string,
      highlight: string,
    },
    radius: number,
  },

  bar: {
    x: number,
    y: number,
    style: {
      normal: string,
      highlight: string,
    },
    width: number,
    height: number,
  },

  sounds: Sound[],

  app: {
    canvas: Canvas,
    bpm: number
  }
}
