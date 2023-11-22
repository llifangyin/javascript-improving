# mdn- 学习web开发 - 如何使用promise promise概念与基本使用
> promise是现代javascript中异步编程的基础，是一个由异步函数返回的可以向我们指示当前操作所处的状态的对象。

## 使用fetchAPI
> 一个现代的、基于promise的、用于替代XMLHttpRequest的方法


## Promise术语

### 三种状态
1. 待定 pending 请求进行中
2. 已兑现 fullfilled 操作成功完成 ， then()处理函数被调用
3. 已拒绝 rejected 操作失败， catch()处理函数被调用

> 如果一个promise处于已决议(resolved)状态，或者它被锁定跟随另一个promise的状态，那么它就是已兑现(fullfilled) 

## 合并使用多个promise

Promise.all()接收一个promise数组，并返回一个单一的promise
+ 当且仅当数组中的所有promsie被兑现时，才会通知then()处理函数提供一个包含所有响应的数组，数组中响应的顺序与被传入all()的promise顺序相同
+ 数组中的任一个promise被拒绝时，catch()处理函数被调用，并提供被拒绝promise抛出的错误


## async 和 await 

> async关键字 提供了更简单的方法来处理异步promise代码，
```bash
async fn ()=>{}
```
在异步函数中，在调用一个返回promise的函数之前使用await ，这使得代码在该点上等待，直到promise被完成，这时promise的响应被当作返回值，或者被拒绝的响应作为错误抛出。 
+ 这使得可以写同步代码一样处理异步函数。

+ 调用await fetch() 得到的并不是promise,而是一个完整的response对象，就好像fetch是个同步函数一样。


> promise是现代js异步编程的基础，它避免了深层嵌套回调，使表达和理解异步操作序列变得更加容易，并且支持类似于同步变成中的try catch语句的错误处理方式
> asnyc await关键字使得从一系列连续的异步函数调用中建立一个操作变得更加容易，避免了显示promise链，允许像写同步代码一样编写异步代码

# mdn web开发技术- 使用promise

## promise 拒绝事件
当一个promise拒绝事件未被任何处理器处理时，它会冒泡到调用栈顶部，主机需要将其暴露出来。 在web上，当promise被拒绝时，会有上下文所属的两个事件之一被派发到全局作用域（window）。
+ rejectionhandled
当promise被拒绝、并且reject函数处理该拒绝事件之后会派发此事件
+ unhanlderejection
当promise被拒绝，当没有reject函数处理，会派发该事件

> 通过以上两种事件为promise失败时提供补偿处理，有利于调试promise相关的问题。


# mnd javascript标准内置对象- promise
> promise对象表示异步擦欧总的完成或失败以及其结果值

+ promise.race
+ promise.any
+ romise.allSettled 等待所有操作完成后在处理promise

## 时序
promise是一种 **控制反转**的形式,api的实现者不控制回调何时被实调用。相反，维护回调队列并决定何时调用的工作就委托了promise的实现者。

```js
Promise.resolve().then(() => console.log(2));
console.log(1); // 1, 2

```
传入then的函数不会立即执行，会放到如**微任务**队列中,这意味着他会在稍后运行（仅在创建函数的函数退出后，且JavaScript执行堆栈为空时），也就是在控制权返回事件循环之前。
```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

wait().then(() => console.log(4));
Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));
console.log(1); // 1, 2, 3, 4

```

## 任务队列与微任务
promise的回调处理为微任务，而settimeout的处理为任务队列
```js
const promise = new Promise((resolve, reject) => {
  console.log("Promise 执行函数");
  resolve();
}).then((result) => {
  console.log("Promise 回调（.then）");
});

setTimeout(() => {
  console.log("新一轮事件循环：Promise（已完成）", promise);
}, 0);

console.log("Promise（队列中）", promise);
// Promise 执行函数
// Promise（队列中）Promise {<pending>}
// Promise 回调（.then）
// 新一轮事件循环：Promise（已完成）Promise {<fulfilled>}

```



### thenable
thenable 对象实现了 .then() 方法，该方法被调用时需要传入两个回调函数，一个用于 Promise 被兑现时调用，一个用于 Promise 被拒绝时调用。Promise 也是 thenable 对象。

### Promise 并发
+ Promise.all()  所有promise兑现时兑现，任一个拒绝时拒绝
+ Promise.allSettled()  所有promise都被敲定时兑现
+ Promise.any() 在任意一个promise兑现时兑现，所有promise拒绝时拒绝
+ Promise.race() 任意一个兑现时兑现，在任意一个promise被拒绝时拒绝

## 构造函数
Promise() 主要用于封装尚未支持Pormise基于回调的api
new Promise(executor)

### promise流程描述
1. 创建新的promise兑现时，会生成一对相应的resovleFunc 和rejectFunc函数；他们与promise兑现绑在一起
2. executor 通常会封装某些提供基于回调的api的异步操作。回调函数在excutor代码中定义，因此它可以访问resolveFunc和rejectFunc
3. executor是同步调用的，并将resolveFunc和rejectFunc作为参数传入
4. executor中的代码有机会执行某些操作。异步任务的最终完成通过rejectFunc和rejectFunc的引起的副作用来与promise实例进行通信。这个副作用会让promise兑现变为已解决状态
5. 一旦promise敲定，他会通过调用then catch finally关联的进一步的处理程序。

## 属性
静态访问器属性 Promise[[@species]]返回用于构造promise方法返回值的构造函数

Promise[Symbol.species]


## 方法
1. Promise.prototype.then
最多接收两个参数 兑现和拒绝的回调函数
then(onFulfilled)
then(onFulfilled, onRejected)
+ 如果 onFulfilled 不是一个函数，则内部会被替换为一个恒等函数（(x) => x），它只是简单地将兑现值向前传递。
+ 如果 onRejected 不是一个函数，则内部会被替换为一个抛出器函数（(x) => { throw x; }），它会抛出它收到的拒绝原因

**返回值**
立刻返回一个新的promise对象，该对象始终处于敲定状态，无论当前promise对象的状态如何。
返回的 Promise 对象（称之为 p）的行为取决于处理函数的执行结果，遵循一组特定的规则。如果处理函数：
+ 返回一个值： p以该值作为兑现结果
+ 没有返回值   p以undefined作为兑现值
+ 抛出一个错误  p抛出的错误作为拒绝值
+ 返回一个已兑现的promise  p已改promise的值作为兑现值
+ 返回一个已拒绝的promise p以该promise的拒绝值作为拒绝值
+ 返回一个待定的promise p 保持待定状态，并在promise敲定后返回该值


> 如果在同一个对象上两次调用then方法，该promise对象将具有两对处理方法，按照他们添加的顺序执行。


> then() 方法返回的值的解决方式与 Promise.resolve() 相同
> 如果函数抛出错误或返回一个被拒绝的 Promise，则 then 返回的 Promise 最终将被拒绝

2. Promise.prototype.reject
用于注册一个在promise被拒绝时调用的函数，他会立即返回一个等效的promise对象
全写 Promise.prototype.then(undefined,onRejected) 

**参数** 
onRejected 
处理拒绝异步执行的函数，参数reaseon
**返回值**


3. promise.resovle()
promise**静态方法**将给定的值转换为一个promise，如果该值是一个promise，则返回该promise；如果该值是一个thenable对象，promise.resolve将调用then()方法及其两个回调函数；
**返回值**
一个由给定值解决的promise,如果该值是一个promise对象则返回该对象。
用于解决的promise可以处理已对现、拒绝、待定的中任何一种，例如对一个已拒绝的promise进行调用仍将返回一个拒绝的promise
实际上是右侧的简写==> new Promise((resolve)=>resolve(value))

+ resolve另一个原生的promise，它将返回同一实例，可以用== 判断是否相同


4. Promise.reject()
Promise.reject 静态方法返回一个被拒绝的 Promise 对象。通过使用 Error 的实例获取错误原因 reason 对调试和选择性错误捕捉很有帮助。
简写： =>  new Promise((resolve, reject) => reject(reason))
+ 与resolve不同，即使reason可能是一个promise对象，reject方法也会封装一个新的对象


5. Promise.all()
静态方法接受一个 Promise 可迭代对象作为输入,并返回一个 Promise.**当所有输入的 Promise 都被兑现时**，返回的 Promise 也将被兑现
如果输入的任何 Promise 被拒绝，则返回的 Promise 将被拒绝，并带有第一个被拒绝的原因。
**Promise.all(iterable)** 


6. Promise.allSettled
Promise.allSettled() 静态方法将一个 Promise 可迭代对象作为输入，并返回一个单独的 Promise。当所有输入的 Promise 都已敲定时（包括传入空的可迭代对象时），返回的 Promise 将被兑现，并带有描述每个 Promise 结果的对象数组。

每个结果对象都有以下的属性：
+ status fullfiled / rejected
+ value 
+ reason

**在由多个不依赖彼此成功的异步任务时**使用


7. Promise.any

Promise.any() 静态方法将一个 Promise 可迭代对象作为输入，并返回一个 Promise。当输入的任何一个 Promise 兑现时，这个返回的 Promise 将会兑现，并返回第一个兑现的值。当所有输入 Promise 都被拒绝（包括传递了空的可迭代对象）时，它会以一个包含拒绝原因数组的 AggregateError 拒绝。


8. Promise.race()
Promise.race() 静态方法接受一个 promise 可迭代对象作为输入，并返回一个 Promise。这个返回的 promise 会随着第一个 promise 的敲定而敲定。

9. Promise.prototype.finally()

Promise实例的finally方法用于注册一个在 promise 敲定（兑现或拒绝）时调用的函数.它会立即返回一个等效的 Promise 对象，这可以允许你链式调用其他 promise 方法。
```bash
finally(onFinally)
```
