class TicTacToe {
    constructor() {
        this.playerTurn = 'X';
        this.boardState = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.turnDisplayElement = document.getElementById("turn");
        this.renderBoard();
        let item = document.getElementsByClassName("grid-item");
        for(let i =0; i<item.length; i++)
            item[i].style.backgroundColor = " rgb(137, 197, 137)";
        
        
    }   

    playerClick(id){
        const [i,j] = this.getIndex(id);
        if(this.boardState[i][j]===""){
            this.boardState[i][j] = this.playerTurn;
            this.changePlayerTurn();
        }
    }

    getIndex(id){
        id=Number(id);
        const row = Math.ceil(id/3)-1;
        const col = (id-1)%3;
        return [row,col];
    }

    changePlayerTurn(){
        this.playerTurn = this.playerTurn==='X'? 'O':'X';
        this.renderBoard();
        setTimeout(( )=> this.checkGame(),1);
    }

    renderBoard(){
        this.updateBoard();
        this.showPlayerTurn();
    }

    updateBoard(){
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                let id  = (i*3)+(j+1);
                document.getElementById(id).innerHTML= this.boardState[i][j];
                if(this.boardState[i][j] === 'X')  {
                    document.getElementById(id).style.color = 'red';
                    document.getElementById(id).style.backgroundColor = 'orange';
                }
                if(this.boardState[i][j] === 'O') {
                    document.getElementById(id).style.color = 'green';
                    document.getElementById(id).style.backgroundColor = 'lime';

                }
            }
        }
    }

    showPlayerTurn() {
        if(this.playerTurn === 'X') {
            this.turnDisplayElement.innerText = "Player 1's Turn";
            this.turnDisplayElement.style.color = "red";
        }
        if(this.playerTurn === 'O') {
            this.turnDisplayElement.innerText = "Player 2's Turn";
            this.turnDisplayElement.style.color = "green";
        }
    }

    checkGame() {
        let won = true;
        
        // check for rows
        for(let i=0; i<3;i++) {
            won = true;

            for(let j=1; j<3; j++) {
                if(this.boardState[i][j] !== this.boardState[i][j-1]) {
                    won = false;
                    break;
                }
            }
            if(won && this.boardState[i][0]!== '') {
                return this.alertWin(this.boardState[i][0]);
            }
        }
        // check for cols
        for(let j=0; j<3; j++) {
            won = true;

            for(let i=1; i<3; i++) {
                if(this.boardState[i][j] !== this.boardState[i-1][j]) {
                    won = false;
                    break;
                }
            }
            if(won && this.boardState[0][j]!== '') {
                return this.alertWin(this.boardState[0][j]);
            }
        }
        // check forward diagnol
        won = true;
        for(let i=1; i<3; i++) {
            if(this.boardState[i][i] !== this.boardState[i-1][i-1]) {
                    won = false;
                    break;
                }
        }
        if(won && this.boardState[0][0]!== '') {
                return this.alertWin(this.boardState[0][0]);
        }
        // check anti-diagnol
        won = true;
        for(let i=1; i<3; i++) {
            if(this.boardState[i][2-i] !== this.boardState[i-1][2-i+1]) {
                    won = false;
                    break;
                }
        }
        if(won && this.boardState[2][0]!== '') {
                return this.alertWin(this.boardState[2][0]);
        }
        // check for draw
        let draw = true;
        for(let i=0; i<3; i++) {
            for(let j=0; j<3; j++) {
                if(this.boardState[i][j] === '') {
                    draw = false;
                    break;
                }
            }
            if(draw == false) {
                break;
            }
        }
        if(draw) {
            return this.alertDraw();
        }

    }

    alertWin(playerWon) {
        if(playerWon === 'X') {
            alert('Congratulations! Player1 wins');
        }
        else {
            alert('Congratulations! Player2 wins');
        }
        initializeGame();
    }

    alertDraw() {
        alert('Draw!');
        initializeGame();
    }

}
let currentGame;
function initializeGame(){
    currentGame = new TicTacToe();
}
initializeGame();

function playTurn(that){
    currentGame.playerClick(that.id);

}