var socket = io();

let side = 25;



function setup() {
    frameRate(5);
    createCanvas(30 * side,30 * side);
    background('#acacac');
}



function nkarel(matrix) {

	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {

			if (matrix[y][x] == 1) {
				fill("green");
			} else if (matrix[y][x] == 2) {
				fill("yellow");
			}
			else if (matrix[y][x] == 0) {
				fill("#acacac");
			} else if (matrix[y][x] == 3) {
				fill("red")
			}
			else if (matrix[y][x] == 4) {
				fill("black")
			}
			else if (matrix[y][x] == 5) {
				fill("blue")
			}

			rect(x * side, y * side, side, side);


		}
	}
}


setInterval(
    function () {
    socket.on('send matrix', nkarel)
    },1000
)

function ba(){
    let but = document.getElementById("but");

    but.onclick = hi;
    function hi (){
        body.style.backgroundColor = "green";
    }
}

window.onload = ba;