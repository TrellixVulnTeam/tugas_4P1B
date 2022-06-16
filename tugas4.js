function indexPrime(param1) {

   function IndexPrimer2(hasil) {
      if (hasil < 2) {
         return false;
      } else {
         for (let i = 2; i <= Math.sqrt(hasil); i++) {
            if (hasil % i == 0) {
               return false;
            }
         }
         return true;
      }
   }
   let param2 = [];
   let number = 2;
   while (param2.length < param1) {
      if (IndexPrimer2(number)) {
         param2.push(number)
      }
      number++
   }
   return param2[param2.length - 1];
}

console.log(indexPrime(4)) //result => 7
console.log(indexPrime(500)) //result => 3571
console.log(indexPrime(37786)) //result => 450881