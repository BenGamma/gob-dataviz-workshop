import { Graphics } from 'pixi.js';
import $ from 'jquery';

class LocPoint extends Graphics {
  constructor( options ) {

    super();
    this.x = options.xOrigin;
    this.y = options.yOrigin;
    this.xDest = options.xDest;
    this.yDest = options.yDest;
    this.country_name = options.country_name;
    this.stud_number = options.stud_number;

    this.vx = options.velocity;
		this.vy = options.velocity;
    this.beginFill( 0xFFFFFF );
    this.drawCircle(0, 0, 5);
    this.endFill();
    this.hitArea = new PIXI.Rectangle(-10, -10, 20, 20);
    this.interactive = true;
    this.on('mousedown', this.onClick );
    // this.on('mouseover', function(eventData){
    //   console.log("over");
    // });

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
      delay: 1.5,
      ease: Strong.easeOut
    })
  }

  moveToParis( destX, destY ){
    TweenMax.to( this, 1, {
      x: destX,
      y: destY,
      delay: 1.5,
      ease: Strong.easeOut
    })
  }

}

export default LocPoint;
