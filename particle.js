;(function(win){
  "use strict";
  var
    doc = win.document,
    stage = null,
    canvasWidth = 240,
    canvasHeight = 240,
    partNum = 2000,


    renderer = null,

    stage = null,

    color = [
      0xff6094,
      0x746b7e,
      0xffc321,
      0xfddc00,
      0xff93be,
      0x4b5894,
      0x27a224,
      0x30d2ef,
      0xfb6884,
      0x13ee8f,
      0xff8400,
      0xee1313,
      0xfa9a12,
      0x5ce7dd,
      0x289e15,
      0xf685cd,
      0x1e67cc,
      0x27dee0
    ],

    colorLen = color.length,

    PI = Math.PI,

    graphics = null,

    radius = 25,

    lineWidth = 7,


    propData = [],
    easing = 50,
    i = 0;

  function int(str) {
    return Math.floor( parseInt(str, 10) );
  };

  function update(){

    var
    random = Math.random,
    abs = Math.abs,
    cos = Math.cos,
    sin = Math.sin;

    graphics.clear();


    // rect.position.x += 1;
    for( i = 0; i < partNum; i ++ ){

      var
      radian = propData[i].rotate * PI / 180,
      cosX = cos( radian ),
      sinY = sin( radian );

      if( random() < 0.005 && propData[i].color === propData[i].toColor ){
        propData[i].color = 16777215;
        propData[i].scale = propData[i].scale * 1.5;
      }

      graphics.lineStyle(lineWidth * propData[i].scale, propData[i].color, propData[i].toS);
      graphics.moveTo(propData[i].x + cosX * radius * propData[i].toS, propData[i].y + sinY * radius * propData[i].toS);
      graphics.lineTo(propData[i].x - cosX * radius * propData[i].toS, propData[i].y - sinY * radius * propData[i].toS);

      // graphics.beginFill(propData[i].color);
      // graphics.drawCircle(propData[i].x, propData[i].y, 10);
      // graphics.endFill();


      propData[i].x = propData[i].x + propData[i].dx * propData[i].toS;
      propData[i].y = propData[i].y + propData[i].dy * propData[i].toS;
      propData[i].rotate = propData[i].rotate + propData[i].dr;

      propData[i].dx = propData[i].dx + ( propData[i].toX - propData[i].dx ) / easing;
      propData[i].dy = propData[i].dy + ( propData[i].toY - propData[i].dy ) / easing;

      propData[i].scale = propData[i].scale + ( propData[i].toS - propData[i].scale ) / easing;

      propData[i].color = propData[i].color + ( propData[i].toColor - propData[i].color ) / easing;


      propData[i].dr = propData[i].dr + ( propData[i].toR - propData[i].dr ) / easing;

      if( abs(propData[i].toX - propData[i].dx) < 0.01 ){
        propData[i].dx = propData[i].toX;
      }

      if( abs(propData[i].toY - propData[i].dy < 0.01) ){
        propData[i].dy = propData[i].toY;
      }

      if( abs(propData[i].toColor - propData[i].color < 0.01) ) {
        propData[i].color = propData[i].toColor;
      }

      if( abs(propData[i].toS - propData[i].scale < 0.01) ) {
        propData[i].scale = propData[i].toS;
      }

      if( propData[i].x > canvasWidth + radius ){
        propData[i].x = -radius;
      } else if( propData[i].x < -radius ) {
        propData[i].x = canvasWidth + radius;
      }

      if( propData[i].y > canvasHeight + radius ){
        propData[i].y = -radius;
      } else if( propData[i].y < -radius ) {
        propData[i].y = canvasHeight + radius;
      }
    }

    renderer.render(stage);
    requestAnimFrame(update);
  };

  function onResize(event) {
    canvasWidth = win.innerWidth;
    canvasHeight = win.innerHeight;
    renderer.resize(canvasWidth, canvasHeight);
  };


  function onMouseOver(event) {
    var random = Math.random;
    for( i = 0; i < partNum; i ++ ){

      propData[i].dx = propData[i].dx + (event.wheelDelta > 0? 1 : -1) * ( random() * 50 );
      propData[i].dy = propData[i].dy + (event.wheelDelta > 0? -1 : 1) * ( random() * 50 );

      propData[i].dr = propData[i].dr + random() * 360;
    }
  };

  function getDist(x, y, dx, dy){
    return Math.sqrt( (x - dx) * (x - dx) + (y - dy) * (y - dy) );
  };

  function init(event){

    var random = Math.random;

    canvasWidth = win.innerWidth;
    canvasHeight = win.innerHeight;

    renderer = new PIXI.autoDetectRenderer(canvasWidth, canvasHeight);

    stage = new PIXI.Stage(0x181818, false);

    graphics = new PIXI.Graphics();
    

    doc.body.appendChild(renderer.view);

    for( i = 0; i < partNum; i ++ ){

      propData[i] = {
        x: random() * canvasWidth,
        y: random() * canvasHeight,
        rotate: random() * 360,
        // scale: (int(Math.random() * 100) + 1) / 100,

        color: parseInt( color[ i % colorLen ].toString(10), 10),
        toColor: parseInt( color[ i % colorLen ].toString(10), 10),
        dColor: random() * 0.1 + 0.1,

        dx: random() * -4 + 2,
        dy: random() * -4 + 2,
        toX: 1,
        toY: -1,

        dr: random() * 360,
        toR: random() * -4 + 2,

        dS: 0.1,
        toS: 0.1        
      };

      propData[i].scale = propData[i].toS = ((i % 10) + 1) / 10;

    }

    stage.addChild(graphics);

    renderer.render(stage);

    requestAnimFrame(update);
  };

    

  doc.addEventListener('DOMContentLoaded', init, false);
  // doc.addEventListener('click', onMouseOver, false);
  win.addEventListener("resize", onResize, false);

  if (win.addEventListener) {
    win.addEventListener('DOMMouseScroll', onMouseOver, false);
  }
  win.onmousewheel = document.onmousewheel = onMouseOver;

})(window);