const container = document.getElementById('con-content');
const select = document.querySelector('select');

const word = document.querySelector('#word');

const lostword = [
    'เล่นได้แค่นี้จริงดิ',
    'อ่อนเกิ๊นนนนนนนนนนนนน',
    'ไปฝึกมาใหม่เหอะจริง',
    'เคยชนะบ้างยัง',
    'ว๊าาา แพ้อีกละ',
    'เลิกเล่นเหอะ',
    'กลับไปเล่นออดิชั่นเหอะ',
    'เอาดี๊',
    'ถามจริง 🤣',
    'เด็กน้อยยังเก่งกว่า',
    'ต้องให้สอนมั้ย ?',
    'แหมแกก็',
    'เอาจริงได้ยัง หรือได้แค่นี้',
    'เห็นแล้วเครียดแทนเลยว่ะ',
    'โหแกยังไม่เลิกเล่นอีกจริงดิ'
]

const winword = [
    'เก่งจังเลยยยยย',
    'เล่นมาตั้งนานพึ่งชนะเองเหรอ',
    'เก่งมัก ✌️😂😀😰😢😥🤔🤔😘🧐🙍‍♂️👌🫥🧐😘👉💦'
]

// set bomb
let bombcount = 5;

// function ranemoji() {
//     let inneremoji = [];
//     for(let i = 0; i < 25; i++) {
//         inneremoji.push('😀');
//     }

//     for(let i = 0; i < bombcount; i++) {
//         let bomb = Math.floor(Math.random() * 25);
//         if(inneremoji[bomb] == '💣') {
//             bomb = Math.floor(Math.random() * 25);
//         } else {
//             inneremoji[bomb] = '💣';
//         }
//     }

//     return inneremoji;
// }

function create() {
    bombcount = parseInt(select.value);
    let inneremoji = [];
    for(let i = 0; i < 25; i++) {
        inneremoji.push('😀');
    }

    for(let i = 0; i < bombcount; i++) {
        let bomb = Math.floor(Math.random() * 25);
        if(inneremoji[bomb] == '💣') {
            bomb = Math.floor(Math.random() * 25);
        } else {
            inneremoji[bomb] = '💣';
        }
    }

    for(let i = 0; i < inneremoji.length; i++) {
        container.innerHTML += `
        <div class="content bg-gray-700">
            <div id="hidden-emoji" class="flex items-center justify-center text-3xl font-bold text-white hidden-content bg-slate-600 hover:bg-slate-500"></div>
            <p class="check text-3xl" draggable="false">${inneremoji[i]}</p>
        </div>`;
    }
}



function play() {
    bombcount = parseInt(select.value);
    select.addEventListener('change', () => {
        bombcount = parseInt(select.value);
        container.innerHTML = '';
        // create();
        play();
    })
    let inneremoji = [];
    for(let i = 0; i < 25; i++) {
        inneremoji.push('😀');
    }

    for(let i = 0; i < bombcount; i++) {
        let bomb = Math.floor(Math.random() * 25);
        if(inneremoji[bomb] == '💣') {
            bomb = Math.floor(Math.random() * 25);
        } else {
            inneremoji[bomb] = '💣';
        }
    }

    for(let i = 0; i < inneremoji.length; i++) {
        container.innerHTML += `
        <div class="content bg-gray-700">
            <div id="hidden-emoji" class="flex items-center justify-center text-3xl font-bold text-white hidden-content bg-slate-600 hover:bg-slate-500"></div>
            <p class="check text-3xl" id="cant-drag">${inneremoji[i]}</p>
        </div>`;
    }

    // set emoji cant select and drag
    const cantdrag = document.querySelectorAll('#cant-drag');
    for(let i = 0; i < cantdrag.length; i++) {
        cantdrag[i].addEventListener('dragstart', (e) => {
            e.preventDefault();
        })
    }

    const hiddenemoji = document.querySelectorAll('#hidden-emoji');
    const check = document.querySelectorAll('.check');
    const cl = document.querySelector('#clickleft');
    const bc = document.querySelector('#bombcount');

    let count = 0;
    cl.innerHTML = `Click count: ${count} / ${hiddenemoji.length - bombcount}`;
    bc.innerHTML = `Bomb count: ${bombcount}`;


    for(let i = 0; i < hiddenemoji.length; i++) {
        hiddenemoji[i].addEventListener('click', () => {
            hiddenemoji[i].style.display = 'none';
            count++;
            cl.innerHTML = `Click count: ${count} / ${hiddenemoji.length - bombcount}`;
            // win
            if(count == hiddenemoji.length - bombcount && check[i] != '💣') {
                container.innerHTML = '';
                play();
                count = 0;
                cl.innerHTML = `Click count: ${count} / ${hiddenemoji.length - bombcount}`;
                alert('You Win!!!');

                let random = Math.floor(Math.random() * lostword.length);
                word.innerHTML = winword[random];
            }
            // lose
            if(check[i].innerHTML == '💣') {
                container.innerHTML = '';
                play();
                count = 0;
                cl.innerHTML = `Click count: ${count} / ${hiddenemoji.length - bombcount}`;
                container.style.animation = 'shake 0.3s ease-in-out';
                setTimeout(() => {
                    container.style.animation = 'none';
                }, 1000)

                let random = Math.floor(Math.random() * lostword.length);
                word.innerHTML = lostword[random];
            }
        })
    }
}

play();
