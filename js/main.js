const fieldSide = 5;
let divsFieldEl = document.querySelector('.divsField');
let statusEl = document.querySelector('.status');
let btnUpEl = document.querySelector('.up');
let btnDownEl = document.querySelector('.down');
let btnLeftEl = document.querySelector('.left');
let btnRightEl = document.querySelector('.right');
gameOverEl = document.querySelector('.end');
let z = 10;

const getMultiArr = (fieldSide) =>{
    let arr = [];
    for(let i = 0; i<fieldSide; i++){
        arr[i] = [];
        for(let k = 0; k<fieldSide; k++){
            arr[i][k] = 0;
        }
    }
    return arr;
}
let gameField = getMultiArr(fieldSide);

const cleanArr = (arr) =>{
    arr.forEach(el =>{
        el.fill(null);
    });
    return arr;
}
cleanArr(gameField);

let x = 0;
let y = 0;

const render = () =>{
    let str = '';
    gameField.forEach(el1 =>{
        el1.forEach(el2 =>{
        if(el2 === 1){
            str = `${str}${'<div class = "blue"></div>'}`;
        }else if(el2 === 2){
            str = `${str}${'<div class = "orange"></div>'}`;
        }else {
            str = `${str}${'<div class = "white"></div>'}`;
        }
        divsFieldEl.innerHTML = str;
    });
});
}
render();

const disableButton = () => {
    btnDownEl.disabled = true;
    btnUpEl.disabled = true;
    btnLeftEl.disabled = true;
    btnRightEl.disabled = true;
}

const disDown = ()=>{
    if(x === gameField.length-1){
        btnDownEl.disabled = true;
    }else{
        btnDownEl.disabled = false;
    };
};

const disUp = ()=>{
    if(x === 0){
        btnUpEl.disabled = true;
    }else{
        btnUpEl.disabled = false;
    };
};

const disLeft = ()=>{
    if(y === 0){
        btnLeftEl.disabled = true;
    }else{
        btnLeftEl.disabled = false;
    };
};

const disRight = ()=>{
    if(y === gameField.length-1){
        btnRightEl.disabled = true;
    }else{
        btnRightEl.disabled = false;
    };
};

const countEl = () =>{
    let count = [];
    for(let i=0; i<gameField.length; i++){
        for(let k=0; k<gameField[i].length; k++){
            if(gameField[i][k] !== null){
                count.push('k');
            }
        }
    }
   return count.length;
};

const time = () =>{
    z = z-1;
    console.log(z);
    if(z === 0){
        gameOverEl.style.opacity = '100';
        disableButton();
        clearInterval(id);
    }
}

let id = setInterval(time, 1000);

const shift=()=>{
    gameField[x][y] = 1;
    disDown();
    disUp();
    disLeft();
    disRight();
    render();
    statusEl.innerHTML = countEl();
};

shift();

const shiftDown = () =>{
    gameField[x][y] = 2;
    if (x !== gameField.length-1){x += 1;};
    shift();
};
const shiftUp = () =>{
    gameField[x][y] = 2;
    if (x !== 0){x -= 1;};
    shift();
};
const shiftLeft = () =>{
    gameField[x][y] = 2;
    if (y !== 0){y -= 1;};
    shift();
};
const shiftRight = () =>{
    gameField[x][y] = 2;
    if(y !== gameField.length-1){y += 1;};
    shift();
};

btnUpEl.addEventListener('click', shiftUp);

btnDownEl.addEventListener('click', shiftDown);

btnLeftEl.addEventListener('click', shiftLeft);

btnRightEl.addEventListener('click', shiftRight);

document.addEventListener('keydown', (e)=>{
    switch(e.code){
        case 'ArrowUp':
            shiftUp();
            break;
        case 'ArrowDown':
            shiftDown();
            break;
        case 'ArrowLeft':
            shiftLeft();
            break;
        case 'ArrowRight':
            shiftRight();
            break;
    }
});
