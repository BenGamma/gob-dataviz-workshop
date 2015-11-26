import { Graphics } from 'pixi.js';
import $ from 'jquery';
import Chartist from 'node-chartist';

class LocPoint extends Graphics {
  constructor( options ) {

    super();
    this.x = options.xOrigin;
    this.y = options.yOrigin;
    this.xDest = options.xDest;
    this.yDest = options.yDest;
    this.country_name = options.country_name;
    this.formations = options.formations;
    this.stud_number = 0;

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
    console.log("student total", this.country_name, this.studentTotal());

    $('.overlay').click(function(){
      $('.overlay').css("display", "none");
    });

  }

  onClick(eventData){
    // $('.overlay').css("display", "block");
    $('.overlay').fadeIn(400);
    console.log(this.country_name);
    $('.country-name-overlay').html(this.country_name);
    $('.student-number').html(this.studentTotal());

    // new Chartist.Line('#chart1', {
    //   labels: [1, 2, 3, 4],
    //   series: [[100, 120, 180, 200]]
    // });

  }

  // css("display", "block");

  move( destX, destY ){
    TweenMax.to( this, 1, {
      x: destX,
      y: destY,
      delay: .5,
      ease: Strong.easeOut
    })
  }

  studentTotal(){
    this.stud_number = 0;
    for (var i = 0; i < this.formations.length; i++) {
      this.stud_number += parseInt(this.formations[i].nbr_stud);
    }
    return this.stud_number;
  }

}

export default LocPoint;
