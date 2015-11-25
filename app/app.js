import Dat from 'dat-gui';
import Scene from './scene/scene';
import { Graphics } from 'pixi.js';
import NumberUtils from './utils/number-utils';
import LineLayer from './lib/line-layer';
import LocPoint from './lib/loc-point';


// var svg = document.getElementById('world-svg');


class App {

  constructor() {

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
    console.log(this.centerX, this.centerY);

    this.optionsPointA = {
      x: this.centerX,
      y: this.centerY,
      country: 'france'
    };

    this.optionsPointB = {
      x: this.centerX,
      y: this.centerY,
      country: 'england'
    };

    this.locPointA = new LocPoint( this.optionsPointA );
    this.locPointB = new LocPoint( this.optionsPointB );

    // this.scene.addChild( this.lineLayer );
    //
    // this.scene.addChild( this.locPointA );
    // this.scene.addChild( this.locPointB );

    this.addListeners();


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
      this.locPointB.move(300, 300);
      console.log('timer');
    }


    // angle += 0.05;
    this.lineLayer.draw(this.locPointA.x, this.locPointA.y, this.locPointB.x, this.locPointB.y);

    // this.ball.x = ( window.innerWidth / 2 ) + Math.sin( angle ) * 100;

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
