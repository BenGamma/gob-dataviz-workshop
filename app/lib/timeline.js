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


  }
}

export default Timeline;
