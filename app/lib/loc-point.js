import { Graphics } from 'pixi.js';
import $ from 'jquery';
import Chartist from 'chartist';

class LocPoint extends Graphics {
  constructor( options, scene ) {

    super();
    this.scene = scene;
    this.x = options.xOrigin;
    this.y = options.yOrigin;
    this.xDest = options.xDest;
    this.yDest = options.yDest;
    this.country_name = options.country_name;
    this.formations = options.formations;
    
    this.stud_number = 0;
    this.actualFormationsArray = [];
    this.actualStudNbrInForm = [];
    // draw point
    this.beginFill( 0xFFFFFF );
    this.drawCircle(0, 0, 5);
    this.endFill();
    // increaze size of hit area
    this.hitArea = new PIXI.Rectangle(-10, -10, 20, 20);
    this.interactive = true;
    this.on('mousedown', this.onClick );

    // hide overlay on click
    $('.overlay').click(function(){
      $('.overlay').css("display", "none");
    });

  }

  onClick(eventData){

    // display overlay and bind info
    $('.overlay').fadeIn(400);
    $('.country-name-overlay').html(this.country_name);
    $('.student-number').html(this.studentTotal());

    // init graph options
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

    // Instanciate graph object
    new Chartist.Line('#chart1', data, graphOptions);

  }

  // move locpoint to destination
  move( destX, destY ){
    TweenMax.to( this, 1, {
      x: destX,
      y: destY,
      ease: Strong.easeOut
    })
  }

  // move locpoint to paris and remove from scene
  moveToParis( destX, destY ){
    var self = this;
    TweenMax.to( this, 1, {
      x: destX,
      y: destY,
      ease: Strong.easeOut,
      onComplete: function(){
        self.scene.removeChild(self);
      }
    })
  }

  // calcul student total for a location
  studentTotal(){
    this.stud_number = 0;
    for (var i = 0; i < this.formations.length; i++) {
      this.stud_number += parseInt(this.formations[i].nbr_stud);
    }
    return this.stud_number;
  }

  // get formation name by location
  formationNamePerYear(){
    this.actualFormationsArray = [];
    for (var i = 0; i < this.formations.length; i++) {
      this.actualFormationsArray.push(this.formations[i].name);
    }
    return this.actualFormationsArray;
  }

  // calcul student total by formation
  studentPerFormationAndYear(){
    this.actualStudNbrInForm = [];
    for (var i = 0; i < this.formations.length; i++) {
      this.actualStudNbrInForm.push(this.formations[i].nbr_stud);
    }
    return this.actualStudNbrInForm;
  }

}

export default LocPoint;
