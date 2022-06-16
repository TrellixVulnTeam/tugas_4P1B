function spiral(n) {

    // Create 2D array of size n*n
    var matrix = new Array(n);
      for(var i=0; i < matrix.length; i++) {
         matrix[i] = new Array(n);
      }
    
      for(var i=0; i < n;i++) {
        for(var j=0; j < n; j++) {
           matrix[i][j] = 0;
        }
      }
    
      var startNum = 0;
      var rowNum = 0;
    
      function spin(rowNum) {
    
       // right
       for(var j=rowNum; j < (n-rowNum); j++) {
          startNum++; 
          matrix[rowNum][j] = startNum;
       }
    
       if(startNum === (n*n)) {
          return; // exit if number matches to the size of the matrix. ( 16 = 4*4 )
       }
    
       // down
       for(var i=(rowNum+1); i < (n-(rowNum+1)); i++) {
         startNum++; 
         matrix[i][n-(rowNum+1)] = startNum;
       }
    
       if(startNum === (n*n)) {
          return; // exit if number matches to the size of the matrix. ( 16 = 4*4 )
       }
    
      // left
       for(var j=(n-(1+rowNum)); j >= rowNum; j--) {
         startNum++; 
         matrix[(n-(1+rowNum))][j] = startNum;
       }
    
    
       if(startNum === (n*n)) {
          return; // exit if number matches to the size of the matrix. ( 16 = 4*4 )
       }
    
       //top
       for(var i=(n-(2+rowNum)); i > rowNum; i--) {
          startNum++; 
          matrix[i][rowNum] = startNum;
       }
    
      if(startNum === (n*n)) {
          return ; // exit if number matches to the size of the matrix. ( 16 = 4*4 )
       }
    
      spin(rowNum+1);
    
    
     }  
    
      spin(rowNum);
    
      console.log(matrix)
    }
    
    spiral(6);