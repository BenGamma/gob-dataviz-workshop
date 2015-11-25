import Dat from 'dat-gui';
import Scene from './scene/scene';
import { Graphics } from 'pixi.js';
import NumberUtils from './utils/number-utils';
import LineLayer from './lib/line-layer';
import LocPoint from './lib/loc-point';
import countries from './datas/countries';
import Timeline from './lib/timeline';
import $ from 'jquery';


class App {

  constructor() {
    console.log(countries);

    this.DELTA_TIME = 0;
    this.LAST_TIME = Date.now();

    this.timeline = new Timeline();

    this.timer = 0;

    this.width = window.innerWidth;
    this.height = window.innerHeight;




    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    this.currentLocPos = [];

    this.scene = new Scene();
    this.lineLayer = new LineLayer();

    let root = document.body.querySelector('.app')
    root.appendChild( this.scene.renderer.view );
    this.lineLayer.y = 0;
    this.lineLayer.x = 0;


    // this.scene.addChild( this.lineLayer );
    //
    // this.scene.addChild( this.locPointA );
    // this.scene.addChild( this.locPointB );
    this.bgHeight = $('.app').height();
    this.bgWidth = $('.app').width();
    this.addListeners();
    this.init();


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

    if (this.timer > 100){
      this.timer = 0;
      // this.locPointB.move(300, 300);

      console.log('timer');
    }


    // this.lineLayer.draw(this.locPointA.x, this.locPointA.y, this.locPointB.x, this.locPointB.y);


    this.scene.render();


  }

  init(){
    this.generateLocPoints();
    for (var i = 0; i < this.currentLocPos.length; i++) {
      this.scene.addChild(this.currentLocPos[i]);
    }
    this.animLocPointInit();
  }

  generateLocPoints(){


    for (var i = 0; i < countries.length; i++) {

      const options = {
        x: countries[0].posX * this.bgWidth / 100,
        y: countries[0].posY * this.bgHeight / 100,
        country_name: countries[i].name
      }
      var locPoint = new LocPoint( options );
      // locPoint.click(function(data){
      //   console.log("clic");
      // })
      this.currentLocPos.push(locPoint);
    }

  }

  animLocPointInit(){
    console.log("anim");
    for (var i = 0; i < this.currentLocPos.length; i++) {
      this.currentLocPos[i].move(countries[i].posX * this.bgWidth / 100, countries[i].posY * this.bgHeight / 100);
      // console.log(this.currentLocPos[i].x, this.currentLocPos[i].y);
    }
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
