import { Graphics } from 'pixi.js';

class LocPoint extends Graphics {
  constructor( options ) {

    super();
    this.x = options.x;
    this.y = options.y;
    this.country_name = options.country_name;

    this.vx = options.velocity;
		this.vy = options.velocity;
    // this.particleScaleFactor = 1;
    this.beginFill( 0xFFFFFF );
    this.drawCircle(0, 0, 5);
    this.endFill();

  }

  move( destX, destY ){

    TweenMax.to( this, 1, {
      x: destX,
      y: destY,
      delay: .5,
      ease: Strong.easeOut
    } )

  }

}

export default LocPoint;
