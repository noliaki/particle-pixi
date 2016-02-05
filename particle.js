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

    isMouseDown = false,

    propData = [],
    easing = 50;

  function int(str) {
    return Math.floor( parseInt(str, 10) );
  };

  function update(){

    var
    i = 0,
    len = partNum,
    random = Math.random,
    abs = Math.abs,
    cos = Math.cos,
    sin = Math.sin;

    graphics.clear();


    // rect.position.x += 1;
    for( ; i < len; i ++ ){

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

      if( abs(propData[i].toY - propData[i].dy) < 0.01 ){
        propData[i].dy = propData[i].toY;
      }

      if( abs(propData[i].toColor - propData[i].color) < 0.01 ) {
        propData[i].color = propData[i].toColor;
      }

      if( abs(propData[i].toS - propData[i].scale) < 0.01 ) {
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


  function onMouseWheel(event) {
    var
      i = 0,
      len = partNum,
      random = Math.random,
      mouseX = event.pageX,
      mouseY = event.pageY,
      direct = event.wheelDelta > 0? 1 : -1,
      dist = 0,
      vol = 10,
      difX = 0,
      difY = 0;

    for( ; i < len; i ++ ){

      dist = getDist( propData[i].x, propData[i].y, mouseX, mouseY );
      difX = (propData[i].x - mouseX);
      difY = (propData[i].y - mouseY);

      propData[i].dx = propData[i].dx + direct * vol * ( difX / dist);
      propData[i].dy = propData[i].dy + direct * vol * ( difY / dist);
      propData[i].dr = propData[i].dr + random() * 100;
    }
  };

  function onMouseMove(event){
    if( !isMouseDown ) {
      return false;
    }
    var
      i = 0,
      len = partNum,
      random = Math.random,
      mouseX = event.pageX,
      mouseY = event.pageY,
      direct = -1,
      dist = 0,
      vol = 1,
      difX = 0,
      difY = 0;

    for( ; i < partNum; i ++ ){

      dist = getDist( propData[i].x, propData[i].y, mouseX, mouseY );
      difX = (propData[i].x - mouseX);
      difY = (propData[i].y - mouseY);

      propData[i].dx = propData[i].dx + direct * vol * Math.random() * ( difX / dist);
      propData[i].dy = propData[i].dy + direct * vol * Math.random() * ( difY / dist);

      propData[i].dr = propData[i].dr + random() * 100;
    }
  };

  function onMouseDown(event) {
    isMouseDown = true;
  };

  function onMouseUp(event){
    var
      i = 0,
      len = partNum,
      random = Math.random,
      mouseX = event.pageX,
      mouseY = event.pageY,
      direct = 1,
      dist = 0,
      vol = 30,
      difX = 0,
      difY = 0;
    isMouseDown = false;

    console.log("UP")

    for( ; i < len; i ++ ){

      dist = getDist( propData[i].x, propData[i].y, mouseX, mouseY );
      difX = (propData[i].x - mouseX);
      difY = (propData[i].y - mouseY);

      propData[i].dx = propData[i].dx + vol / direct * ( difX / dist);
      propData[i].dy = propData[i].dy + vol / direct * ( difY / dist);
      propData[i].dr = propData[i].dr + random() * 100;
    }

  }

  function onMouseClick(event) {
    var
      i = 0,
      len = partNum,
      random = Math.random,
      mouseX = event.pageX,
      mouseY = event.pageY,
      direct = -1,
      dist = 0,
      vol = 10,
      difX = 0,
      difY = 0;
    console.log("CLICK")


    for( ; i < partNum; i ++ ){

      dist = getDist( propData[i].x, propData[i].y, mouseX, mouseY );
      difX = (propData[i].x - mouseX);
      difY = (propData[i].y - mouseY);

      propData[i].dx = propData[i].dx + direct * vol * ( difX / dist);
      propData[i].dy = propData[i].dy + direct * vol * ( difY / dist);

      propData[i].dr = propData[i].dr + random() * 100;
    }
  };

  function getDist(x, y, dx, dy){
    return Math.sqrt( (x - dx) * (x - dx) + (y - dy) * (y - dy) );
  };

  function init(event){

    var
      i = 0,
      len = partNum,
      random = Math.random;

    canvasWidth = win.innerWidth;
    canvasHeight = win.innerHeight;

    renderer = new PIXI.autoDetectRenderer(canvasWidth, canvasHeight);

    stage = new PIXI.Stage(0x181818, false);

    graphics = new PIXI.Graphics();
    

    doc.body.appendChild(renderer.view);

    for( ; i < len; i ++ ){

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
  win.addEventListener("resize", onResize, false);
  win.addEventListener("mousemove", onMouseMove, false);
  win.addEventListener("mousedown", onMouseDown, false);
  win.addEventListener("mouseup", onMouseUp, false);

  doc.addEventListener('click', onMouseClick, false);
  if (win.addEventListener) {
    win.addEventListener('DOMMouseScroll', onMouseWheel, false);
  }
  win.onmousewheel = document.onmousewheel = onMouseWheel;

})(window);