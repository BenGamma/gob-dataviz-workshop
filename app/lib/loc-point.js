import { Graphics } from 'pixi.js';

class LocPoint extends Graphics {
  constructor( options ) {

    super();
    this.x = options.x;
    this.y = options.y;
    this.country = options.country;

    this.vx = options.velocity;
		this.vy = options.velocity;
    // this.particleScaleFactor = 1;
    this.beginFill( 0xFF0000 );
    this.drawCircle(0, 0, 5);
    this.endFill();

  }

  move( destX, destY ){

    TweenMax.to( this, 2, {
      x: destX,
      y: destY,
      delay: .5,
      ease: Elastic.easeOut
    } )

  }

}

export default LocPoint;
