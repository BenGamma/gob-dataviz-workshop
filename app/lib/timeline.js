import $ from 'jquery';
import LocPoint from './loc-point';
import countries from '../datas/countries';
import ee from './event-emitter';
import _ from 'underscore';

class Timeline {
  constructor( scene ) {

    this.scene = scene;

    this.currentLocPos = [];
    this.previousLocPos = [];
    this.bgHeight = $('.app').height();
    this.bgWidth = $('.app').width();

    this.events();
    this.init();
  }


  init(){
    var self = this;
    this.generateLocPoints('2005');
    console.log(this.currentLocPos);

    ee.on('START_XP', function(){
      self.animLocPointInit();
    });
    ee.on('CHANGE_YEAR', function(year){
      self.generateLocPoints( year );
      console.log(self.currentLocPos);
      self.animLocPointInit();
    });
  }

  generateLocPoints( year ){
    this.previousLocPos = this.currentLocPos;
    this.currentLocPos = [];
    for (var i = 0; i < countries.length; i++) {
      for (var j = 0; j < countries[i].years_list.length; j++) {
        if (countries[i].years_list[j].year === year){
          const options = {
            xOrigin: countries[0].posX * this.bgWidth / 100,
            yOrigin: countries[0].posY * this.bgHeight / 100,
            xDest: countries[i].posX,
            yDest: countries[i].posY,
            country_name: countries[i].name
          }
          var locPoint = new LocPoint( options );
          this.currentLocPos.push(locPoint);
        }
      }
    }
    this.animReturnToParis(_.difference(this.currentLocPos, this.previousLocPos));
  }

  animLocPointInit(){
    console.log("animLocPointInit");
    for (var i = 0; i < this.currentLocPos.length; i++) {
      this.scene.addChild(this.currentLocPos[i]);
      this.currentLocPos[i].move(this.currentLocPos[i].xDest * this.bgWidth / 100, this.currentLocPos[i].yDest * this.bgHeight / 100);
    }
  }

  animReturnToParis(arrayLocToReturn){
    for (var i = 0; i < arrayLocToReturn.length; i++) {
      // this.scene.addChild(this.currentLocPos[i]);
      arrayLocToReturn[i].moveToParis( countries[0].posX, countries[0].posY);
    }
  }


  events(){
    $('.timeline').find( "a" ).click(function() {
      let year = $(this).parent().text();
      console.log($(this).parent().text());
    	$('.timeline').find( "a" ).removeClass('timeline-dot-actif');
  		$(this).toggleClass('timeline-dot-actif');
      ee.emit('CHANGE_YEAR', year);
   });

    $('.start-experience').click(function() {
      $('.landing_container').css({'margin-top':'-20vh', 'opacity':'0'});
      $('.landing').delay(700).fadeOut(400);

      ee.emit('START_XP');

    });

  }


}

export default Timeline;
