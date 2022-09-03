const app = new PIXI.Application({
  width: 800, height: 600, backgroundColor: 0x000000, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

// Move container to the center
//container.x = app.screen.width / 2;
//container.y = app.screen.height / 2;

for (i = 0; i<256; i=i+5){
  for (j = 0; j<256; j=j+5)
    if(i%15 == 0 && j%15 == 0){
    graphic = new PIXI.Graphics()
    graphic.beginFill(0xFFFFFF)
    graphic.drawRect(i+1,j+1,10,10)
    graphic.beginFill(0x000000)
    graphic.drawRect(i+2,j+2,8,8)
    container.addChild(graphic)
    }
}
container.pivot.x = container.width / 2;
container.pivot.y = container.width / 2;

container.setTransform(0, 0, 1, 1,    2,    0,0,  00,00 )
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

console.log(container.children)

app.ticker.remove(app.render,app);

const APP_FPS = 20;


let elapsedTime = 0
fpsDelta = 60/APP_FPS;

app.ticker.autoStart = false;
app.ticker.minFPS = 2;
app.ticker.maxFPS = 3;
console.log(app.ticker.FPS)

app.ticker.add(tick);
let ticks = container.children.length/2+8
let snake_length = 3;
let buffered_tiles = []
function tick(delta)
{
    // console.log('tick', delta);
    ticks++
    elapsedTime += delta;

     if(elapsedTime>=fpsDelta)
     {
        //enough time passed, update app
        update(elapsedTime);
        //reset
        elapsedTime = 0;
    }
}
let prev = 0
function update(delta)
{

    //console.log(ticks)
    //console.log(container.getChildAt(Math.floor(delta*5)).geometry.graphicsData[0].shape.x)
    if(ticks>=0){
    //console.log(container.getChildAt(ticks))
    buffered_tiles.push
    square_x = container.getChildAt(ticks).graphicsData[0].shape.x
    //console.log(container.getChildAt(ticks).graphicsData[0].shape.height)
    //console.log(container.getChildAt(ticks).graphicsData[0].shape.width)

    square_y = container.getChildAt(ticks).graphicsData[0].shape.y

    //console.log(container.getChildAt(ticks).geometry.graphicsData.x)
    //container.getChildAt(ticks).geometry.graphicsData[0].y
    console.log(
      square_x,
      square_y
    )
    buffered_tiles.push([square_x,square_y])
    if(buffered_tiles.length > snake_length){
      container.getChildAt(ticks-snake_length).clear()
      g = new PIXI.Graphics()
      g.beginFill(0xFFFFFF)
      g.drawRect(buffered_tiles[buffered_tiles.length-1][0],buffered_tiles[buffered_tiles.length-1][1],10,10)
      g.beginFill(0x000000)
      g.drawRect(buffered_tiles[buffered_tiles.length-1][0]+1,buffered_tiles[buffered_tiles.length-1][1]+1,8,8)
      container.addChildAt(g,ticks-snake_length)
      buffered_tiles.shift();
      ticks++
    }

    if(square_y == 256){
      ticks-=36
    }


    for(i = 0; i<buffered_tiles.length; i++){
      new_color = new PIXI.Graphics()
      new_color.beginFill(0xDDDD)
      new_color.drawRect(buffered_tiles[i][0],buffered_tiles[i][1],10,10)
      new_color.beginFill(0xDDDD*-0.5)
      new_color.drawRect(buffered_tiles[i][0]+1,buffered_tiles[i][1]+1,8,8)
    }
    container.getChildAt(ticks).clear()
    container.removeChildAt(ticks)
    new_color = new PIXI.Graphics()
    new_color.beginFill(0xDDDD)
    new_color.drawRect(square_x,square_y,10,10)
    new_color.beginFill(0xDDDD*-0.5)
    new_color.drawRect(square_x+1,square_y+1,8,8)
    container.addChildAt(new_color,ticks)
    
    }


    //container.getChildAt(Math.floor(delta*10)).clear()

    app.render();

}

console.log(app.ticker.started)


