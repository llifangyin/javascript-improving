// Polyfill
// es.promise, es.promise.all-settled, es.promise.any and es.promise.finally.

// class Promise{
//     constructor(executer:(resolve:Function,reject:Function)=>void):Promise;
//     then(onFullfilled:Function,onRejected:Function):Promise;
//     catch(onRejected:Function):Promise;
//     finally(onFinally:Function):Promise;
//     static resolve(x:any):Promise;
//     static reject(x:any):Promise;
//     static all(iterable:Iterable):Promise;
//     static allSettled(iterable:Iterable):Promise;
//     static all(promises:Iterable):Promise;
//     static race(iterable:Iterable):Promise;
// }


// example

function sleepRandom(time) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time * 1e3, 0 | Math.random() * 1e3);
    });
  }
  
  console.log('Run');                    // => Run
  sleepRandom(5).then(result => {
    console.log(result);                 // => 869, after 5 sec.
    return sleepRandom(10);
  }).then(result => {
    console.log(result);                 // => 202, after 10 sec.
  }).then(() => {
    console.log('immediately after');    // => immediately after
    throw Error('Irror!');
  }).then(() => {
    console.log('will not be displayed');
  }).catch(x => console.log(x)); 