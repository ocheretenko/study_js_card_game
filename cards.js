{
    document.addEventListener('DOMContentLoaded', init);

const buttonLabel = 'click';
const buttonValues = ['1','2','3','4','1','2','3','4'];

const widthLength = 4;
const heightLength = 4;
const quantity = widthLength * heightLength;
const valueAttributeName = 'card-value';
const classWrong = 'btn-danger';
const classActive = 'btn-warning';
const classDone = 'btn-secondary';

let buttons = [];
let activeCard = null;
let clickLocked = false;


function init() {
    const buttonValuesMessed = (buttonValues.concat(buttonValues)).sort(() => Math.random() - 0.5);

    for (i = 0; i < quantity; i ++) {
        let btn = document.createElement('button');
        btn.classList.add('btn','btn-primary', 'card-btn');
        btn.innerText = buttonLabel;
        btn.setAttribute(valueAttributeName, buttonValuesMessed[i]);
        document.body.appendChild(btn);

        btn.addEventListener('click', cardClick);
        buttons.push(btn);
    }
}

function cardClick(event) {
    if (clickLocked) return;

    let tg = event.currentTarget;

    //highlight solved card
    if (tg.classList.contains(classDone)) {
        tg.classList.add(classWrong);

        setTimeout(() => {tg.classList.remove(classWrong)}, 300);

        return;
    }

    if (activeCard === tg) {
        tg.classList.add(classWrong);

        setTimeout(() => {tg.classList.remove(classWrong)}, 300);
        return;
    }

    if (activeCard === null) {
        activeCard = tg;

        tg.classList.add(classActive);
        tg.innerText = tg.getAttribute(valueAttributeName);

        return;
    }

    if (cardClick !== null) {
        //wrong
        if (activeCard.getAttribute(valueAttributeName) !== tg.getAttribute(valueAttributeName)) {
            // tg.classList.add(classDone);
            activeCard.classList.remove(classActive);
            activeCard.classList.add(classWrong);
            tg.classList.add(classWrong);
            tg.innerText = tg.getAttribute(valueAttributeName);

            clickLocked = true;

            setTimeout(() => {
                tg.classList.remove(classWrong);
                activeCard.classList.remove(classWrong);

                activeCard.innerText = buttonLabel;
                tg.innerText = buttonLabel;

                activeCard = null;
                clickLocked = false;
            }, 500);
            return;
        }
        
        //right
        if (activeCard.getAttribute(valueAttributeName) === tg.getAttribute(valueAttributeName)) {
            activeCard.classList.add(classActive);
            tg.classList.add(classActive);
            tg.innerText = tg.getAttribute(valueAttributeName);

            clickLocked = true;

            setTimeout( () => {
                tg.classList.remove(classActive);
                activeCard.classList.remove(classActive);

                activeCard.classList.add(classDone);
                tg.classList.add(classDone);

                clickLocked = false;
                activeCard = null;

                checkFinishState();
            }, 500);

            return;
        }
    }
}

function checkFinishState() {
    
    for (let el of buttons) {
        if (el.classList.contains(classDone) === false) return;
    };

    //winscreen
    buttons.forEach(el => {
        el.style.display = 'none';
    });

    let h1 = document.createElement('h1');
    h1.innerText = 'U WON!';
    document.body.append(h1);
}
}