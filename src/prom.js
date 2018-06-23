let prom = new Promise(
    function(resolve, reject) {
        setTimeout (function (){
            resolve('Done');
        }, 1000);
    }
)

// prom.then(function(res){
//     console.log(res);
// });

async function printData() {
    data = await prom;
    return data;
}

let data = printData();
console.log(data);
console.log('end');