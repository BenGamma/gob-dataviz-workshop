import { Graphics } from 'pixi.js';
import $ from 'jquery';
import Chartist from 'chartist';

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
    this.actualFormationsArray = [];
    this.actualStudNbrInForm = [];

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

    let data = {
      labels: this.formationNamePerYear(),
      series: [this.studentPerFormationAndYear()]
    };
    let graphOptions = {
      width: '500px',
      height: '200px',
      chartPadding: {
        top: 50
      }
    };

    new Chartist.Line('#chart1', data, graphOptions);

  }

  // css("display", "block");

  move( destX, destY ){
    TweenMax.to( this, 1, {
      x: destX,
      y: destY,
      // delay: .5,
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

  formationNamePerYear(){
    this.actualFormationsArray = [];
    for (var i = 0; i < this.formations.length; i++) {
      this.actualFormationsArray.push(this.formations[i].name);
    }
    return this.actualFormationsArray;
  }

  studentPerFormationAndYear(){
    this.actualStudNbrInForm = [];
    for (var i = 0; i < this.formations.length; i++) {
      this.actualStudNbrInForm.push(this.formations[i].nbr_stud);
    }
    return this.actualStudNbrInForm;
  }

}

export default LocPoint;
