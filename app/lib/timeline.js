import $ from 'jquery';

class Timeline {
  constructor() {
    this.events();
  }
  events(){
    console.log($('canvas'));

    $('.timeline').find( "a" ).click(function() {
    	$('.timeline').find( "a" ).removeClass('timeline-dot-actif');
  		$(this).toggleClass('timeline-dot-actif');
	});

    $('.start-experience').click(function() {

      $('.landing_container').css({'margin-top':'-20vh', 'opacity':'0'});
      $('.landing').delay(700).fadeOut(400);


    });


  }
}

export default Timeline;
