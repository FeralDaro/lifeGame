let activeArray = [];
let inactiveArray = [];

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

let arrCreate = (N, M) => {
    activeArray = [];
    for (let i = 0; i < N; i++) {
        activeArray[i] = [];
        for (let j = 0; j < M; j++) {
            activeArray[i][j] = getRandomIntInclusive(0, 1);

        }
    }
    inactiveArray = activeArray;
}
let arrToString = (array) =>{
    for(let i = 0; i<array.length; i++){
        let b = array[i].join(' ');
        console.log(b)
    }
}

setCellValueHelper = (N, M) => {
    try {
        return activeArray[N][M];
    } catch {
        return 0;
    }
};
countNeighbours = (N, M) => {
    let total_neighbours = 0;
    total_neighbours += setCellValueHelper(N - 1, M - 1);
    total_neighbours += setCellValueHelper(N - 1, M);
    total_neighbours += setCellValueHelper(N - 1, M + 1);
    total_neighbours += setCellValueHelper(N, M - 1);
    total_neighbours += setCellValueHelper(N, M + 1);
    total_neighbours += setCellValueHelper(N + 1, M - 1);
    total_neighbours += setCellValueHelper(N + 1, M);
    total_neighbours += setCellValueHelper(N + 1, M + 1);
    return total_neighbours;
};
updateCellValue = (N, M) => {

    const total = countNeighbours(N, M);
    if (total > 3 || total < 2) {
        return 0;
    }
    else if (activeArray[N][M] === 0 && total === 3) {
        return 1;
    }
    else {
        return activeArray[N][M];
    }

};
updateLifeCycle = (N, M) => {

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            inactiveArray[i][j] = updateCellValue(i,j);
        }
    }
    activeArray = inactiveArray;

};
startGame = (N, M) => {
    arrCreate(N, M);
    console.log(inactiveArray)
    setInterval(()=>{
        updateLifeCycle(N,M);
        arrToString(inactiveArray)
    }, 1000)
}