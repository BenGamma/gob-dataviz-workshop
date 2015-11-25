import { Graphics } from 'pixi.js';

class LineLayer extends Graphics{
  constructor(scene) {
    super();
    this.color = this.getRandomColor();

  }

  draw( xOut, yOut, xIn, yIn ){

    this.lineStyle(5, 0xFF0000, 1);
    this.moveTo(xOut, yOut);

  	this.lineTo(xIn, yIn);
  }


  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '0x';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

export default LineLayer;
