var app = new Vue({
    el: '#app',
    data: {
        board: new Array(9).fill(""),
        text: "¡Juega con mi bot!",
        winnerResult: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ],
        count: 0,
        ico: 'fa-bars',
        menuVisible: false,
        handleMenu() {
            if (this.menuVisible) {
                this.ico = 'fa-bars';
            } else {
                this.ico = 'fa-times';
            }
            this.menuVisible = !this.menuVisible;
        },
        handleClick(key) {
            if (this.board[key] === "" && !this.areWinner) {
                this.count++;
                Vue.set(this.board, key, "X")
                //this.board[key] = "X";
                this.checkWinner();
                if (this.count < 5 && !this.areWinner) {
                    this.botPost(this.board).then((num) => {
                        Vue.set(this.board, num, "O")
                        // this.board[num] = "O";
                        this.checkWinner();
                    });
                }
                if (!this.areWinner && this.count === 5) {
                    this.text = "¡Empate!";
                }
            }
        },
        botPost() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (
                        this.countX() === 1 &&
                        (this.board[1] === "X" ||
                            this.board[3] === "X" ||
                            this.board[4] === "X")
                    ) {
                        resolve(0);
                    } else if (
                        this.countX() === 1 &&
                        (this.board[7] === "X" || this.board[5] === "X")
                    ) {
                        resolve(8);
                    } else if (this.countX() === 1) {
                        resolve(4);
                    }
                    if (this.isDangerComb("O")!==false) {
                        resolve(this.isDangerComb("O"));
                    } else if (this.isDangerComb("X")!==false) {
                        console.log("danger");
                        resolve(this.isDangerComb("X"));
                    } else {
                        let rand;
                        do {
                            rand = Math.round(Math.random() * 8);
                        } while (this.board[rand] !== "");
                        resolve(rand);
                    }
                }, 300);
            });
        },
        countX() {
            let result = 0;
            for (let i = 0; i < this.board.length; i++) {
                if (this.board[i] === "X") {
                    result++;
                }
            }
            return result;
        },
        isDangerComb(letter) {
            let result = false;
            for (let i = 0; i < this.winnerResult.length; i++) {
                if (
                    this.board[this.winnerResult[i][0]] === letter &&
                    this.board[this.winnerResult[i][1]] === letter &&
                    this.board[this.winnerResult[i][2]] === ""
                ) {
                    result = this.winnerResult[i][2];
                } else if (
                    this.board[this.winnerResult[i][0]] === letter &&
                    this.board[this.winnerResult[i][1]] === "" &&
                    this.board[this.winnerResult[i][2]] === letter
                ) {
                    result = this.winnerResult[i][1];
                } else if (
                    this.board[this.winnerResult[i][0]] === "" &&
                    this.board[this.winnerResult[i][1]] === letter &&
                    this.board[this.winnerResult[i][2]] === letter
                ) {
                    result = this.winnerResult[i][0];
                }
            }
            return result;
        },
        checkWinner() {
            let check = (row, letter) => {
                if (
                    this.board[row[0]] === letter &&
                    this.board[row[1]] === letter &&
                    this.board[row[2]] === letter
                ) {
                    this.text = "🎉A ganado " + letter + "🎉";
                    this.areWinner = true;
                }
            };
            for (let i = 0; i < this.winnerResult.length; i++) {
                ["X", "O"].forEach((letter) => {
                    check(this.winnerResult[i], letter);
                });
            }
        },
        reset() {
            this.board.fill("");
            this.areWinner = false;
            this.text = "";
            this.text = "¡Juega con mi bot!";
            this.count = 0;
        },
    }

});