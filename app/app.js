import Dat from 'dat-gui';
import Scene from './scene/scene';
import { Graphics } from 'pixi.js';
import NumberUtils from './utils/number-utils';
import countries from './datas/countries';
import Timeline from './lib/timeline';
import $ from 'jquery';
import _ from 'underscore';


class App {

  constructor() {

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    this.scene = new Scene();

    let root = document.body.querySelector('.app')
    root.appendChild( this.scene.renderer.view );

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
