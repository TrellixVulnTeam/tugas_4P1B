function deretKaskus(n){
   // var hasilA=1;
   var hasil=[]
       for(var i = 1; i <= n; i++) {
            let tiga= i*3
            
            if(tiga%5 ==0 &&tiga%6 ==0){
               hasil.push('kaskus')
            }  else if (tiga%5==0) {
               hasil.push('kas');
            } else if (tiga%6==0){
               hasil.push('kus')
            } else {
               hasil.push(tiga)

            }
       }
       return hasil;
   }
console.log(deretKaskus(10))