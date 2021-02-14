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
    // cell with more than 4 or less then 3 neighbours dies. 1 => 0; 0 => 0
    if (total > 3 || total < 2) {
        return 0;
    }
    // dead cell with 3 neighbours becomes alive. 0 => 1
    else if (activeArray[N][M] === 0 && total === 3) {
        return 1;
    }
    // or returning its status back. 0 => 0; 1 => 1
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
        console.log(inactiveArray)
    }, 1000)
}
startGame(10,10)