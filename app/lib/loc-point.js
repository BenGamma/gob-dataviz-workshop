import { Graphics } from 'pixi.js';
import $ from 'jquery';

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
    this.hitArea = new PIXI.Rectangle(0, 0, 100, 100);
    this.interactive = true;
    this.on('mousedown', this.onClick );
    // this.on('mouseover', function(eventData){
    //   console.log("over");
    // });
    console.log(this);

  }

  onClick(eventData){
    console.log("clic");
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
