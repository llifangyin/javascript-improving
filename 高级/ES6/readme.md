# Promise对象 用于表示一个异步操作的最终完成（或失败）及其结果值

## 描述
 一个promise对象 代表一个在这个promise被创建出来时不一定已知值的代理。
 它能够把异步操作最终的成功返回值或者失败原因和相应的处理程序关联起来。 这样异步方法可以像同步方法那样返回值：异步方法并不会立即返回最终的值，而是返回一个promise，以便在未来的某个时候交给使用者。

 一个promise必然处于三种状态之一：
 + pending  初始状态
 + fulfilled 成功完成
 + rejected 失败

```js
Promise.prototype  
{
    catch f
    finally f
    then f
    Symbol(Symbol.toStringTag)  "Promise"
    constructor  f promise ()
                all 
                allsetteled
                any
                prototype
                name
                race
                reject
                resolve
                Symbol(Symbol.species)
                Symbol(Symbol.species)

}
```


参见另一个单独研究的promise项目 [promise-mdn](https://github.com/llifangyin/promise-mdn)。