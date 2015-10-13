var nRooks = function(n){

  var _nRooks = function(queenLocations, all, positions, bit, count){
    //possible positions are anywhere where col not set
    //bit mask positions to size of n
    positions = ~(queenLocations) & all;
    
    //while there is a move;
    while(positions > 0){
      //get the least most bit and remove from positions
      positions ^= bit = positions & -positions;
      //recursive call adding move to queenLocations
      count += _nRooks(queenLocations | bit, all, 0,0,0);
    }
    //increment count if num queens equals n
    queenLocations==all && ++count;
    return count;
  };

  return _nRooks(0,(1<<n)-1,0,0,0);
};
