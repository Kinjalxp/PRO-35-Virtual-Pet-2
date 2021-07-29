var dog, happyDogImg, dogImg, happyDog; 
var database;
var foodS;
var foodStock = 20;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var myEngine, myWorld;

var foodObj;
var food1,food2,food3,food4,food5,food6,food7,food8,food9,food10,
food11,food12,food13,food14,food15,food16,food17,food18,food19,food20;

var feed, addFood;
var lastFed;

function preload()
{
	happyDogImg = loadImage("images/happydog.png");
  dogImg = loadImage("images/dogImage.png");
}

function setup() {
	createCanvas(1000,500);
  
	myEngine = Engine.create();
	myWorld = myEngine.world;

  database = firebase.database();
  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

    dog = createSprite(800,250,10,10);
    dog.addImage(dogImg);
    dog.scale = 0.3;


    feed = createButton("Feed the Dog");
    feed.position(900,95);
    feed.mousePressed(feedDog);

    addFood = createButton("Add Food");
    addFood.position(1000,95);
    addFood.mousePressed(addFoods);

   // food1 = new Food(10,10,10,10);
    //food2 = new Food(100,100,10,10);
}

function draw() {  
  
  background(46,139,87);

  foodObj.display();
  fedTime = database.ref("feedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12 + "PM",600,30);
  }
  else if(lastFed == 0){
    text("Last Fed: 12 AM",600,30);
  }
  else{
    text("Last Fed: " + lastFed + "AM",600,30);
  }

  
  //food2.display();

  drawSprites();
  
}

function readStock(data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
}

// function writeStock(x){
  
//   if(x<=0){
//     x = 0;
//   }
//   else{
//     x = x - 1;
//   }

//   database.ref('/').update({
//     Food: x
//   })
// }

function addFoods(){
  foodS++
  database.ref('/').update({
    Food: foodS
  })
}

function feedDog(){
  dog.addImage(happyDogImg);
 if(foodObj.getFoodStock()< 0){
   foodObj.updateFoodStock(foodObj.getFoodStock()*0)
 }
else{
  console.log("113");
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
}
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime: hour()
  })
}