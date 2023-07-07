let canvas = document.getElementById("holst")

let oblast = canvas.getContext("2d")

let x = canvas.width/2
let y = canvas.height-50
let dx = -4
let dy = -4
let ballRadius = 15

let platformHeight = 20
let platformWidth = 150

let platformX = (canvas.width-platformWidth)/2

let right = false
let left = false

document.addEventListener("keydown", pressDown, false)
document.addEventListener("keyup", pressUp, false)

function pressDown(e)
{
	if(e.key == "Right" || e.key == "ArrowRight")
	{
		right = true
	}
	else if(e.key == "Left" || e.key == "ArrowLeft")
	{
		left = true
	}
}
function pressUp(e)
{
	if(e.key == "Right" || e.key == "ArrowRight")
	{
		right = false
	}
	else if(e.key == "Left" || e.key == "ArrowLeft")
	{
		left = false
	}
}

let blocksRow = 5
let blocksColum = 7

let blocksHeight = 35
let blockWidth = 150

let blockMargin = 15

let blockLeft = 30
let blockTop = 30

let bricks = []

for(let i = 0; i < blocksColum; i++)
{
	bricks[i] = []

	for(let j = 0; j < blocksRow; j++)
	{
		bricks[i][j] = {x:0, y:0, status: 1}
	}
}

function drowBlock()
{
	for(let i = 0;i < blocksColum; i++)
		for(let j = 0;j < blocksRow; j++)
		{
			if(bricks[i][j].status == 1)
			{
				let bX = i * (blockWidth + blockMargin) + blockLeft
				let bY = j * (blocksHeight + blockMargin) + blockTop

				bricks[i][j].x = bX;
				bricks[i][j].y = bY;	

				oblast.beginPath()
					oblast.rect(bX, bY,blockWidth, blocksHeight)
					oblast.fillStyle = "red"
					oblast.fill()
				oblast.closePath()
			}
		}
}

function destroy()
{
    for(let i = 0;i < blocksColum; i++)
        for(let j = 0; j < blocksRow; j++)
            {
               let b = bricks[i][j]
               if(b.status == 1)
               {
                 if( x > b.x && x < b.x + blockWidth && y> b.y && y < b.y + blocksHeight)
                 {
                    dy = -dy;
                    b.status = 0

// звук Уничтожения
                    pim.play()

                    score++
                    if(score ===35)
                    {
                    	// звук вийгриша
                    	pobeda.play()
                    	Win(score)
 	                    clearInterval(interval)
                    }
                }
            }  
        }
    }
function drawFrame(){
	oblast.clearRect(0,0,canvas.width,canvas.height)
	oblast.beginPath()
	 oblast.arc(x,y,ballRadius,0,Math.PI * 2,false)
	 oblast.fillStyle = "blue"
	 oblast.fill()
	 oblast.closePath()
	 oblast.beginPath()
     oblast.rect(platformX, canvas.height- platformHeight - 20, platformWidth, platformHeight)
     oblast.fillStyle = "red"
     oblast.fill()
	 oblast.closePath()
	 proverkaSten()
	 drawScore()
	 drowBlock()
	 destroy()
	 drawLives()

	 if(right == true)
{
	platformX += 7
	if(platformX + platformWidth > canvas.width)
	{
		platformX = canvas.width-platformWidth
	}
}
	else if(left == true)
{
	platformX -= 7
	if (platformX<0)
	{
		platformX = 0
	}
}
	 x+=dx
	 y+=dy
}

function startGame()
{
  let start=document.getElementById("start")
  let holst=document.getElementById("holst")

  start.style.display= "none"
  holst.style.display="block"


  interval = setInterval(drawFrame,10)
}
function Win(score)
{
	let holst = document.getElementById("holst")
	let p = document.getElementById("score")

	let win =document.getElementById("win")

	holst.style.display="none"
	win.style.display="block"

	p.innerText = "набрано очков:" + score
}
function lose(score)
{
	let holst = document.getElementById("holst")
	let p = document.getElementById("score")

	let lose =document.getElementById("lose")

	holst.style.display="none"
	lose.style.display="block"

	p.innerText = "набрано очков:" + score
}
let interval 
function proverkaSten()
{
	//
	if(x + dx > canvas.width - ballRadius || x + dx < ballRadius)
 {
 	dx = -dx
 }

 if(y + dy < ballRadius)
 {
 	dy= -dy 
 }
 
 if(y+dy > canvas.height - ballRadius - 20)
 {
 	if(x>platformX && x<platformX+platformWidth)
 	{
 		dy= -dy

 		// звук отскока
 		otckok.play()
 	}
 	else
 	{
 		// звук пройгриша
 		prooo.play()
 		lives--
 		dy=-dy
 		let random = Math.random()*(3-1)-1

        if(random==2)
        {
        	dx=-dx
        }

 		if(!lives)
 		 {
 			lose(score)
 	        clearInterval(interval)
 		 }
 	  }	
   }
}

let score=0

function drawScore()
{
	oblast.font= "16px arial"
	oblast.fillStyle = "blue"
	oblast.fillText("Score:" + score, 8,20)
}

let lives = 3 

function drawLives()
{
   oblast.font = "16px Arial"
   oblast.fillStyle= "blue"
   oblast.fillText("Lives:" + lives, 1100,20)
} 

var otckok = new Audio("./mp3/otckok.mp3")

var prooo = new Audio("./mp3/prooo.mp3")

var pobeda = new Audio("./mp3/pobeda.mp3")

var pim = new Audio("./mp3/pim.mp3")