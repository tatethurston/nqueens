var nQueens = function(n){

  var _nQueens = function(cols, dL, dR, boardSize, positions, move, count){
    //possible positions are anywhere where col not set
    //and not able to be attacked by diagonnal major or minor
    //bit mask to size of n
    positions = ~(cols | dL | dR) & boardSize;
    
    //while there is a move;
    while(positions > 0){

      //get the least most bit and remove move from list of moves
      positions ^= move = positions & -positions;

      //recursive call adding move to cols and updating
      //left and right diagonnal attacks
      count += _nQueens(cols | move, (dL | move) >> 1, (dR | move) << 1, boardSize, 0,0,0);
    }

    //increment count if num queens equals n
    cols==boardSize && count++;
    return count;
  };
  return _nQueens(0,0,0,(1<<n)-1,0,0,0);
};

//performance testing
var findNQueens = function(n){
 
  start = Date.now(); // start time

  solution = nQueens(n);

  end = Date.now(); //end time

  runTime = end - start;
  console.log('Found solution: ' + solution + ' in ' + runTime + 'ms');
};
