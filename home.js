
attack = document.getElementById("audio1")
heal = document.getElementById("audio2")
victory = document.getElementById("audio3")

name1 = document.getElementById("name-1")
name2 = document.getElementById("name-2")

enteredname1 = document.getElementById("name1")
enteredname2 = document.getElementById("name2")

attack1 = document.getElementById("attacking-1")
attack2 = document.getElementById("attacking-2")

heal1 = document.getElementById("healing-1")
heal2 = document.getElementById("healing-2")

score1 = document.getElementById("score-1")
score2 = document.getElementById("score-2")

msg = document.getElementById("status")

reset = document.getElementById("gameReset")
gameDisplay = document.getElementById("game-display")

formDisplay = document.getElementById("form-display")
resetDisplay = document.getElementById("reset-btn-display")

start = document.getElementById("start-btn")



start.addEventListener("click", () => {
    
    let value = true;

    if (enteredname1.value == "" || enteredname2.value == "") {
        value = false
    }


    if (value == true) {
        formDisplay.style.display = "none";
        gameDisplay.style.visibility = "visible";
        msg.style.visibility = "visible";
        resetDisplay.style.visibility = "visible";
    }


    function updateGame(p1, p2, gameState) {
        name1.innerText = p1.name
        name2.innerText = p2.name
        score1.innerText = "score : " + p1.health.toString()
        score2.innerText = "score : " + p2.health.toString()


        if (p1.health <= 0 || p2.health <= 0) {
            game.isOver = true
            gameState = game.isOver
            msg.innerText = game.declareResult(gameState, p1, p2)
        }
    }


    class gamePlayer {
        constructor(name, health, attackdmg) {
            this.name = name
            this.health = health
            this.attackdmg = attackdmg
        }


        strike(enemy, player) {
            let damage = Math.floor(Math.random() * 10)
            enemy.health = enemy.health - damage
            msg.innerText = `${player.name} attacked ${enemy.name} by ${damage} damage`
            updateGame(p1, p2, game.isover)
        }


        heal(player) {
            let healingAmount = Math.floor(Math.random() * 10)
            player.health += healingAmount
            msg.innerText = `${player.name} healed by ${healingAmount} medkit`
            updateGame(p1, p2, game.isover)
        }


    }


    let player1 = new gamePlayer(enteredname1.value, 100, 10)

    let player2 = new gamePlayer(enteredname2.value, 100, 10)

    class Game {
        constructor() {
            this.isOver = false;
        }


        declareResult(isOver, p1, p2) {
            let message;
            if (isOver == true && p1.health <= 0) {
                message = `${p2.name} has won the match!!!`
            }
            else if (isOver == true && p2.health <= 0) {
                message = `${p1.name} has won the match!!!`
            }
            victory.play()
            return message
        }


        reset(p1, p2, isOver) {
            p1.health = 100
            p2.health = 100
            this.isOver = false
            updateGame(p1, p2, game.isover)
        }


    }


    let p1 = player1
    let p2 = player2


    game = new Game()

    updateGame(p1, p2, game.gameState)

    reset.addEventListener("click", () => {
        game.reset(p1, p2, game.isOver)
    })



    window.addEventListener("keydown", (e) => {

        if (e.key == "a") {
            if (p1.health > 0 && game.isOver == false) {
                p1.strike(p2, p1)
                attack.play()
            }
        }


        else if (e.key == "z") {
            if (p1.health > 0 && game.isOver == false) {
                p1.heal(p1)
                heal.play()
            }
        }


        else if (e.key == "l") {
            if (p2.health > 0 && game.isOver == false) {
                p2.strike(p1, p2)
                attack.play()
            }
        }


        else if (e.key == "m") {
            if (p2.health > 0 && game.isOver == false) {
                p1.heal(p2)
                heal.play()
            }


        }
    })
})
