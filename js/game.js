const cardsCar = ["audi","audi","bmw","bmw","ford","ford","jaguar","jaguar","land_rover","land_rover","maserati","maserati","mercedes","mercedes","mini","mini","porsche","porsche","rolls","rolls"];

let cards = document.querySelectorAll("div");
cards = [...cards];

const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];

const gamePairs = cards.length / 2
let gameResult = 0;



const clickCard = function () {
    activeCard = this;

    if (activeCard == activeCards[0]) return;

    activeCard.classList.remove("hidden");

    if(activeCards.length === 0) {
        activeCards[0] = activeCard;
        
        return;
    }
    else {
        cards.forEach(card => card.removeEventListener("click",clickCard))
        activeCards[1] = activeCard;
        setTimeout(function(){
            if(activeCards[0].className === activeCards[1].className) {
                console.log("wygrana")
                activeCards.forEach(card => card.classList.add("off"))
                gameResult++;
                cards = cards.filter(card => !card.classList.contains("off"))
                if(gameResult == gamePairs){
                    const EndTime = new Date().getTime();
                    const gameTime = (EndTime - startTime)/1000
                    alert(`Udało się!! Twój wynik to: ${gameTime} sekund`)
                    location.reload();
                }
            }
            else {
                console.log("przegrnan")
                activeCards.forEach(card => card.classList.add("hidden"))
            }
            activeCard = "";
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener("click",clickCard))

        },1000)
        
        
    } 

    


};
const init = function(){
     cards.forEach(card => {
         const position = Math.floor(Math.random()*cardsCar.length);
         card.classList.add(cardsCar[position]);
         cardsCar.splice(position, 1);
     })
    
    setTimeout(function(){
        cards.forEach(card => {
            card.classList.add("hidden")
            card.addEventListener("click",clickCard)
        })
    }, 2000)
}

init()
