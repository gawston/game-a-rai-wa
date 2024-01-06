const container = document.getElementById('con-content');

// set bomb
const bombcount = 5;

function ranemoji() {
    let inneremoji = [];
    for(let i = 0; i < 25; i++) {
        inneremoji.push('😀');
    }

    for(let i = 0; i < bombcount; i++) {
        let bomb = Math.floor(Math.random() * 25);
        if(inneremoji[bomb] == '💣') {
            bomb = Math.floor(Math.random() * 25);
        }
        inneremoji[bomb] = '💣';
    }

    // console.log(inneremoji);
    return inneremoji;
}

function create() {
    let emoji = ranemoji();
    for(let i = 0; i < emoji.length; i++) {
        container.innerHTML += `
        <div class="content bg-gray-700">
            <div id="hidden-emoji" class="flex items-center justify-center text-3xl font-bold text-white hidden-content bg-slate-600 hover:bg-slate-500"></div>
            <p class="check text-3xl" draggable="false">${emoji[i]}</p>
        </div>`;
    }
}

function play() {
    create();

    const hiddenemoji = document.querySelectorAll('#hidden-emoji');
    const check = document.querySelectorAll('.check');
    const cl = document.querySelector('#clickleft');
    const bc = document.querySelector('#bombcount');

    let count = 0;
    cl.innerHTML = `Click left: ${hiddenemoji.length - bombcount}`;
    bc.innerHTML = `Bomb count: ${bombcount}`;

    for(let i = 0; i < hiddenemoji.length; i++) {
        hiddenemoji[i].addEventListener('click', () => {
            hiddenemoji[i].style.display = 'none';
            if(check[i].innerHTML == '💣') {
                alert('You Lost!');
                location.reload();
            }
            count++;
            cl.innerHTML = `Click left: ${hiddenemoji.length - bombcount - count}`;
            if(count == hiddenemoji.length - bombcount) {
                alert('You Win!!!');
                location.reload();
            }
        })
    }
}

play();

