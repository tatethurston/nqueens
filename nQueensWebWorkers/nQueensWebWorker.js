onmessage = function(message){

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

  var position = message.data.position;
  var n = message.data.n;

  //place first queen
  var cols = 0 | position;
  var dL = (0 | position) >> 1;
  var dR = (0 | position) << 1;

  //return number of solutions when placing queen at supplied position
  var count = _nQueens(cols,dL,dR,(1<<n)-1,0,0,0);
  
  postMessage({count: count});
};
