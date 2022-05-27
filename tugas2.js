function deretKaskus(n){
   var hasil=1;
       for(var i = 1; i <= n; i++) {
            let tiga= i*3
            console.log(tiga)
            if (tiga%5==0) {
               console.log('kas');
               ;
            } else if (tiga%6==0){
               console.log('kus')
            } else if(tiga%5&&6){
               console.log('kaskus')
            } else{
            }
       }
       return ;
   }
console.log(deretKaskus(10))