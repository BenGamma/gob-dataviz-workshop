import Dat from 'dat-gui';
import Scene from './scene/scene';
import { Graphics } from 'pixi.js';
import NumberUtils from './utils/number-utils';
import LineLayer from './lib/line-layer';
import countries from './datas/countries';
import Timeline from './lib/timeline';
import $ from 'jquery';
import _ from 'underscore';
import data from './datas/data';


class App {

  constructor() {
    // console.log(_.sortBy(data, 'annee_sortie_ecole'));
    // console.log(_.filter(data, function(){ return num % 2 == 0; }););

    this.DELTA_TIME = 0;
    this.LAST_TIME = Date.now();


    this.timer = 0;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.centerX = this.width / 2;
    this.centerY = this.height / 2;



    this.scene = new Scene();
    this.lineLayer = new LineLayer();



    let root = document.body.querySelector('.app')
    root.appendChild( this.scene.renderer.view );
    this.lineLayer.y = 0;
    this.lineLayer.x = 0;


    // this.scene.addChild( this.lineLayer );

    // this.bgHeight = $('.app').height();
    // this.bgWidth = $('.app').width();
    this.addListeners();

    this.timeline = new Timeline( this.scene );



  }

  /**
   * addListeners
   */
  addListeners() {

    window.addEventListener( 'resize', this.onResize.bind(this) );
    TweenMax.ticker.addEventListener( 'tick', this.update.bind(this) )

  }

  /**
   * update
   * - Triggered on every TweenMax tick
   */
  update() {
    this.lineLayer.clear();

    this.timer += 1;

    this.DELTA_TIME = Date.now() - this.LAST_TIME;
    this.LAST_TIME = Date.now();
    //
    // if (this.timer > 100){
    //   this.timer = 0;
    //   // this.locPointB.move(300, 300);
    //
    //   console.log('timer');
    // }
    // // console.log(this.timeline.currentLocPos);


    // this.lineLayer.draw(this.locPointA.x, this.locPointA.y, this.locPointB.x, this.locPointB.y);


    this.scene.render();


  }






  /**
   * onResize
   * - Triggered when window is resized
   * @param  {obj} evt
   */
  onResize( evt ) {

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.scene.resize( this.width, this.height );


  }


}

export default App;
