import $ from 'jquery';
import LocPoint from './loc-point';
import countries from '../datas/countries';
import ee from './event-emitter';

class Timeline {
  constructor( scene ) {

    this.scene = scene;

    this.currentLocPos = [];
    this.bgHeight = $('.app').height();
    this.bgWidth = $('.app').width();

    this.events();
    this.init();
  }


  init(){
    var self = this;
    this.generateLocPoints('2010');
    for (var i = 0; i < this.currentLocPos.length; i++) {
      this.scene.addChild(this.currentLocPos[i]);
    }
    ee.on('START_XP', function(){
      self.animLocPointInit();
    });
  }

  generateLocPoints( year ){
    this.currentLocPos = [];
    for (var i = 0; i < countries.length; i++) {
      for (var j = 0; j < countries[i].years_list.length; j++) {
        if (countries[i].years_list[j].year === year){
            console.log(countries[i]);
        }
      }

    }
    for (var i = 0; i < countries.length; i++) {
      const options = {
        x: countries[0].posX * this.bgWidth / 100,
        y: countries[0].posY * this.bgHeight / 100,
        country_name: countries[i].name
      }
      var locPoint = new LocPoint( options );
      this.currentLocPos.push(locPoint);
    }
  }

  animLocPointInit(){
    for (var i = 0; i < this.currentLocPos.length; i++) {
      this.currentLocPos[i].move(countries[i].posX * this.bgWidth / 100, countries[i].posY * this.bgHeight / 100);
    }
  }


  events(){
    $('.timeline').find( "a" ).click(function() {
      console.log($(this).parent().text());
    	$('.timeline').find( "a" ).removeClass('timeline-dot-actif');
  		$(this).toggleClass('timeline-dot-actif');
   });

    $('.start-experience').click(function() {
      $('.landing_container').css({'margin-top':'-20vh', 'opacity':'0'});
      $('.landing').delay(700).fadeOut(400);

      ee.emit('START_XP');

    });

  }


}

export default Timeline;
