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
    this.hitArea = new PIXI.Rectangle(-10, -10, 20, 20);
    this.interactive = true;
    this.on('mousedown', this.onClick );
    // this.on('mouseover', function(eventData){
    //   console.log("over");
    // });
    console.log(this);
    $('.overlay').click(function(){
      $('.overlay').css("display", "none");
    });

  }

  onClick(eventData){
    // $('.overlay').css("display", "block");
    $('.overlay').fadeIn(400);
    

    
    console.log(this.country_name);
    $('.country-name-overlay').html(this.country_name);
  }

  // css("display", "block");

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
