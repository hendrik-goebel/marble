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
    color: string,
    radius: number,
  },

  bar: {
    x: number,
    y: number,
    color: string,
    colorActive: string,
    width: number,
    height: number,
  },

  sounds: Sound[],

  app: {
    canvas: Canvas,
    bpm: number
  }
}
