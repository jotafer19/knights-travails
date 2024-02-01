class Node {
    constructor(data) {
        this.data = data;
        this.path = [data];
    }
}

class Queue {
    constructor() {
        this.data = [];
    }

    enqueue(element) {
        this.data.push(element);
    }

    dequeue() {
        return this.data.shift();
    }

    isEmpty() {
        return this.data.length <= 0;
    }
}

function isVisited(node, array) {
    array.forEach(element => {
        if (element[0] === node.data[0] && element[1] === node.data[1]) return true;
    })
    array.push(node.data);
    return false;
}

function knightMoves(start, end, queue = [new Node(start)], visitedNodes = [start]) {
    const possibleMoves = [
        [1, 2], [1, -2],
        [2, 1], [2, -1],
        [-1, 2], [-1, -2],
        [-2, 1], [-2, -1]
    ]

    if (start[0] === end[0] && start[1] === end[1]) return queue.shift();

    if (!queue.length) return;

    const currentPosition = queue.shift();

    possibleMoves.forEach(move => {
        const newPosX = move[0] + currentPosition.data[0];
        const newPosY = move[1] + currentPosition.data[1];

        if (newPosX < 0 || newPosX > 7 || newPosY < 0 || newPosY > 7) return;

        const newPosition = new Node([newPosX, newPosY]);

        if (!isVisited(newPosition, visitedNodes)) {
            queue.push(newPosition);
            newPosition.path = currentPosition.path.concat(newPosition.path);
        }
    })

    return knightMoves(queue[0].data, end, queue, visitedNodes);

}

function getMoves(start, end) {
    const movePath = knightMoves(start, end).path;
    console.log(`You made it in ${movePath.length} moves! Here is your path:`)
    movePath.forEach(move => console.log(move));
}

getMoves([0, 0], [3, 3]);
// You made it in 3 moves! Here is your path:
// [ 0, 0 ]
// [ 1, 2 ]
// [ 3, 3 ]

getMoves([3, 3], [0, 0]);
// You made it in 3 moves! Here is your path:
// [ 3, 3 ]
// [ 2, 1 ]
// [ 0, 0 ]

getMoves([0, 0], [7, 7]);
// You made it in 7 moves! Here is your path:
// [ 0, 0 ]
// [ 1, 2 ]
// [ 2, 4 ]
// [ 3, 6 ]
// [ 4, 4 ]
// [ 5, 6 ]
// [ 7, 7 ]

getMoves([3, 3], [4, 3]);
// You made it in 4 moves! Here is your path:
// [ 3, 3 ]
// [ 4, 5 ]
// [ 6, 4 ]
// [ 4, 3 ]