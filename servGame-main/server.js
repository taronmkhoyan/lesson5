var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
	res.redirect('index.html');
});

server.listen(3000);


////////////////

function generator(matLen, gr, grEat, Pred, Vict, alleat) {
	let matrix = [];
	for (let i = 0; i < matLen; i++) {
		matrix[i] = [];
		for (let j = 0; j < matLen; j++) {
			matrix[i][j] = 0;
		}
	}
	for (let i = 0; i < gr; i++) {
		let x = Math.floor(Math.random() * matLen);
		let y = Math.floor(Math.random() * matLen);
		if (matrix[x][y] == 0) {
			matrix[x][y] = 1;
		}
	}
	for (let i = 0; i < grEat; i++) {
		let x = Math.floor(Math.random() * matLen);
		let y = Math.floor(Math.random() * matLen);
		if (matrix[x][y] == 0) {
			matrix[x][y] = 2;
		}
	}
	for (let i = 0; i < Pred; i++) {
		let x = Math.floor(Math.random() * matLen);
		let y = Math.floor(Math.random() * matLen);
		if (matrix[x][y] == 0) {
			matrix[x][y] = 3;
		}
	}
	for (let i = 0; i < Vict; i++) {
		let x = Math.floor(Math.random() * matLen);
		let y = Math.floor(Math.random() * matLen);
		if (matrix[x][y] == 0) {
			matrix[x][y] = 4;
		}
	}

	for (let i = 0; i < alleat; i++) {
		let x = Math.floor(Math.random() * matLen);
		let y = Math.floor(Math.random() * matLen);
		if (matrix[x][y] == 0) {
			matrix[x][y] = 5;
		}
	}

	return matrix;
}

// console.log(generator(30, 50, 30, 10, 1, 8));


matrix = generator(30, 50, 30, 10, 1, 8);


io.sockets.emit('send matrix', matrix)


grassArr = [];
grassEaterArr = [];
PredatorArr = [];
VictimArr = [];
BombArr = [];


Grass = require("./Grass");
GrassEater = require("./grassEater");
Predator = require("./predator");
Victim = require("./victim")
Bomb = require("./bomb")

function createObject(matrix) {
	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {

			if (matrix[y][x] == 1) {
				var gr = new Grass(x, y)
				grassArr.push(gr)
			}
			else if (matrix[y][x] == 2) {
				var grEat = new GrassEater(x, y)
				grassEaterArr.push(grEat)
			}
			else if (matrix[y][x] == 3) {
				var grPred = new Predator(x, y)
				PredatorArr.push(grPred)
			}
			else if (matrix[y][x] == 4) {
				var grVict = new Victim(x, y)
				VictimArr.push(grVict)
			}
			else if (matrix[y][x] == 5) {
				var bomb = new Bomb(x, y)
				BombArr.push(bomb)
			}

		}
	}

	io.sockets.emit('send matrix', matrix)
}





function game() {
	for (var i in grassArr) {
		grassArr[i].mul();
	}

	for (let i in grassEaterArr) {
		grassEaterArr[i].eat()
	}

	for (let i in PredatorArr) {
		PredatorArr[i].eat()
	}

	for (let i in VictimArr) {
		VictimArr[i].move()
	}

	let count = VictimArr.length

	for (let i in PredatorArr) {
		PredatorArr[i].eatVict()
	}



	for (let j in BombArr) {
		if (count > VictimArr.length) {
			for (let h in BombArr) {
				BombArr[h].mul()
			}
		}
	}

	for (let j in BombArr) {
		if (count > VictimArr.length) {
			for (let f in Bomb) {
				BombArr[f].eat()
			}
		}
	}


	io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)


io.on('connection', function (socket) {
	createObject(matrix)
})