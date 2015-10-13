var _nQueensWebWorking = function(n){
  var count = 0;
  var taskQueue = [];
  var worker, position, numWorkers = 0;

  for (var i = 0; i < n; i++){

    //poisition pointer for starting queen location
    taskQueue.push( 1 << i );

  }

  //instantiate web workers
  for (var i = 0; i < 4; i++){
    //create a webworker and pass starting position and n
    worker = new Worker('nQueensWebWorker.js');
    //track number of workers instantiated
    numWorkers++;

    worker.onmessage = function(message){ 
      
      count+= message.data.count;

      if (taskQueue.length > 0){
        //delegate next task
        position = taskQueue.pop(); 
        this.postMessage({position: position, n: n});
      //otherwise no more tasks
      } else {
        numWorkers--;
        this.terminate();
        if (numWorkers === 0){
          console.log('Solution to ' + n + ' queens is: ' + count);
        }
      }
    };

    //delegate first task
    position = taskQueue.pop(); 
    worker.postMessage({position: position, n: n});

  }
  //remove item from queue and assign to worker
  //when worker returns update count
  //when queue is done and final worker returns
    //return count
};
