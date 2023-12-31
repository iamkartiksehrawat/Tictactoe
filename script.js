'use strict';

//------------------------------------------------------------------------

//function calls

function checkforwin()
{
    for(let temps=0;temps<3;temps++)
    {
        if(arr[0][temps]>=0)
        {
            if((arr[0][temps]==arr[1][temps]) && (arr[1][temps]==arr[2][temps]))
            {
                return temps+4;
            }
        }

        if(arr[temps][0]>=0)
        {
            if((arr[temps][0]==arr[temps][1]) && (arr[temps][1]==arr[temps][2]))
            {
                return temps+1;
            }
        }
    }

    if(((arr[0][0]>=0)&&(arr[0][0]==arr[1][1] && arr[1][1]==arr[2][2]))) 
    {
        return 7;
    }

    if(((arr[0][2]>=0)&&(arr[0][2]==arr[1][1] && arr[1][1]==arr[2][0])))
    {
        return 8;
    }


    return -1;
}


function insertval(sels,i)
{
    let x = 0;
    if(i>=3)
    {
        x=1;
        if(i>=6)
        {
            x=2;
        }
    }

    let y=i%3;

    if(arr[x][y]==-1)
    {
        counter+=1;
        let v = active ? 1 : 0;
        arr[x][y]=v;
        active = active ? 0 : 1;
        let temp = v ? "clickedbox-x" : "clickedbox-o";

        scorebox.forEach(function(s)
        {
            s.classList.toggle("activebox");
        });

        livecard.textContent= active ? 'X Turn' : 'O Turn';

        sels.classList.add(temp);

        if(counter>=5)
        {
            let resultg=checkforwin();
            if(resultg!=-1)
            {
                if(active==0)
                {
                    scorearr[0]++;
                }
                else
                {
                    scorearr[1]++;
                }

                //show karni h opacity
                bgcolr(resultg);

                setTimeout(
                    function(){
                    
                    //hide karni h opacity
                    bgcolr(resultg);
                    resulthead.textContent= active ?'O WINS !!' :'X WINS !!';
                    gamegrid.style.opacity=0;
                    anim();
                    setTimeout(()=>gamegrid.style.opacity=1,6700);
                    setTimeout(()=>results.style.animation="",7000);
                    
                    scoreupdate.forEach(function(sc,i)
                    {
                        sc.textContent=scorearr[i];
                    });

                    next_round();
                    return;
            },2000);

    
            }
            else
            {
                if(counter==9)
                {
                    gamegrid.style.opacity=0;
                    resulthead.textContent="DRAW !!";
                    anim();
                    setTimeout(()=>gamegrid.style.opacity=1,6700);
                    setTimeout(()=>results.style.animation="",7000);
                    next_round();
                    return;
                }
            }
        }
    }
    
}

function anim()
{
    results.style.animation="resultop 6.5s";
}

function bgcolr(x)
{
    if(x==1)
    {
        sel[0].classList.toggle("bgchanged");
        sel[1].classList.toggle("bgchanged");
        sel[2].classList.toggle("bgchanged");
    }

    else if(x==2)
    {
        sel[3].classList.toggle("bgchanged");
        sel[4].classList.toggle("bgchanged");
        sel[5].classList.toggle("bgchanged");
    }
    
    else if(x==3)
    {
        sel[6].classList.toggle("bgchanged");
        sel[7].classList.toggle("bgchanged");
        sel[8].classList.toggle("bgchanged");
    }

    else if(x==4)
    {
        sel[0].classList.toggle("bgchanged");
        sel[3].classList.toggle("bgchanged");
        sel[6].classList.toggle("bgchanged");
    }

    else if(x==5)
    {
        sel[1].classList.toggle("bgchanged");
        sel[4].classList.toggle("bgchanged");
        sel[7].classList.toggle("bgchanged");
    }

    else if(x==6)
    {
        sel[2].classList.toggle("bgchanged");
        sel[5].classList.toggle("bgchanged");
        sel[8].classList.toggle("bgchanged");
    }

    else if(x==7)
    {
        sel[0].classList.toggle("bgchanged");
        sel[4].classList.toggle("bgchanged");
        sel[8].classList.toggle("bgchanged");
    }

    else if(x==8)
    {
        sel[2].classList.toggle("bgchanged");
        sel[4].classList.toggle("bgchanged");
        sel[6].classList.toggle("bgchanged");
    }
    
    
}

function next_round()
{
    counter=0;
    active = 1;
    livecard.textContent='X Turn';
    arr= [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];

    sel.forEach(function(sels){
        sels.classList.remove("clickedbox-o");
        sels.classList.remove("clickedbox-x");
    });

    if(scorebox[1].classList.contains("activebox"))
    {
        scorebox.forEach(function(s)
        {
            s.classList.toggle("activebox");
        });
    }
}

function init_grid()
{
    counter=0;
    active = 1;
    livecard.textContent='X Turn';
    scorearr = [0,0];
    scoreupdate.forEach(function(sc,i)
    {
        sc.textContent=0;
    });

    arr= [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];

    sel.forEach(function(sels){
        sels.classList.remove("clickedbox-o");
        sels.classList.remove("clickedbox-x");
    });

    if(scorebox[1].classList.contains("activebox"))
    {
        scorebox.forEach(function(s)
        {
            s.classList.toggle("activebox");
        });
    }
}

//-------------------------------------------------------------------------

//queryselectors

const playbtn = document.querySelector('.play-button');
const sel = document.querySelectorAll('.ele');
const scorebox = document.querySelectorAll('.scorebox');
const livecard = document.querySelector('.livecard');
const restarts = document.querySelector('.restarts');
const playwindow = document.getElementById('pwindowid');
const startwindow = document.getElementById('swindowid');
const scoreupdate = document.querySelectorAll('.scoreval');
const gamegrid = document.getElementById('gridid');
const results = document.getElementById('resultsid');
const resulthead = document.querySelector('.resulthead');

//-------------------------------------------------------------------------

//initializing the variables
let counter = 0;
let active = 1;
let scorearr = new Array(0,0);
let arr= new Array([-1,-1,-1],[-1,-1,-1],[-1,-1,-1]);



//--------------------------------------------------------------------------

//main


playbtn.addEventListener('click',function()
{
    startwindow.style.opacity=0;
    playwindow.style.opacity=1;
    
    sel.forEach(function(sels,i){
        sels.addEventListener("click",()=>insertval(sels,i));
    });
    
    restarts.addEventListener("click",()=>init_grid());
});




