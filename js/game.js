let play = true
let playerOneSpaces = []
let playerTwoSpaces = []
let clickSquare
let winner = false
// players player 1,2
const player1 = {
    name: 'Player One',
    value: 'X',
    icon: '<i id="xmark" class="fa-sharp fa-solid fa-xmark fa-3x"></i>'

}
const player2 = {
    name: 'Player Two',
    value: 'O',
    icon: '<i id="omark" class="fa-sharp fa-solid fa-o fa-3x"></i>'
}

const winningOptions = [['a1', 'a2', 'a3'],
['b1', 'b2', 'b3'],
['c1', 'c2', 'c3'],
['a1', 'b1', 'c1'],
['a2', 'b2', 'c2'],
['a3', 'b3', 'c3'],
['a1', 'b2', 'c3'],
['c1', 'b2', 'a3']]


// current
let currentPlayer = player1;


function setNextPlayer() {
    if (currentPlayer == player1)
        currentPlayer = player2
    else if (currentPlayer == player2)
        currentPlayer = player1
}


function hasWinner() {
    const playerTurn = document.getElementById('playerName')
    for (let i = 0; i < winningOptions.length; i++) {
        const pTwoContainsAll = winningOptions[i].every(element => {
            return playerTwoSpaces.includes(element)
        })

        const pOneContainsAll = winningOptions[i].every(element => {
            return playerOneSpaces.includes(element)
        })

        if (pOneContainsAll) {
            const h2 = document.getElementById('winner')
            h2.classList.add('X')
            h2.innerText = "X Wins"
            playerTurn.innerText = ''
            winner = true

        }
        else if (pTwoContainsAll) {
            const h2 = document.getElementById('winner')
            h2.classList.add('O')
            h2.innerText = "O Wins"
            playerTurn.innerText = ''
            winner = true

        }

    }
    if(winner === true)
    {
        const buttons = document.querySelectorAll("#game .game-button")
        buttons.forEach((button) => {
            button.removeEventListener('click', clickSquare)
        })
    }
}

function buttonFunctionality(buttonId) {
    const playerTurn = document.getElementById('playerName')
    const button = document.getElementById(buttonId)
    const value = currentPlayer.value
    const icon = currentPlayer.icon
    if (!button.classList.contains('O') && !button.classList.contains('X')) {
        button.innerHTML = icon
        button.classList.add(value)
        if (currentPlayer == player1)
            playerOneSpaces.push(button.id)
        else if (currentPlayer == player2)
            playerTwoSpaces.push(button.id)
        setNextPlayer()
        playerTurn.innerText = `Current Player: ${currentPlayer.value}`
        hasWinner()
    }

}

// main
document.addEventListener('DOMContentLoaded', () => {
    const playerTurn = document.getElementById('playerName')
    playerTurn.innerText = `Current Player: ${currentPlayer.value}`
    const buttons = document.querySelectorAll("#game .game-button")
    buttons.forEach((button) => {
        // if (!button.classList.contains('O') && !button.classList.contains('X')){
        //     button.addEventListener('mouseover', () =>
        //     {
        //         button.innerHTML = currentPlayer.icon
        //         const iTagX = document.getElementById("xmark")
        //         const iTagO = document.getElementById("omark")
        //         if(currentPlayer === player1)
        //             iTagX.classList.add('hover')
        //         if(currentPlayer === player2)
        //             iTagO.classList.add('hover')
        //     })
        //     button.addEventListener('mouseout', () =>
        //     {
        //         button.innerHTML = ''
        //         const iTagX = document.getElementById("xmark")
        //         const iTagO = document.getElementById("omark")
        //         if(currentPlayer === player1)
        //             iTagX.classList.remove('hover')
        //         if(currentPlayer === player2)
        //             iTagO.classList.remove('hover')
        //     })
        //}

        const buttonId = button.id
        button.addEventListener('click', clickSquare = function () {
        buttonFunctionality(buttonId)
        })
        console.log(buttonId)
        
    })
    const reset = document.getElementById('resetButton')
    reset.addEventListener('click', () => {
        const h2 = document.getElementById("winner")
        h2.innerText = ''
        buttons.forEach((button) => {
            if (button.classList.contains("X")) {
                button.innerText = ''
                button.classList.remove('X')
            }
            if (button.classList.contains('O')) {
                button.innerText = ''
                button.classList.remove('O')
            }

        })
        playerOneSpaces = []
        playerTwoSpaces = []
    })
})
