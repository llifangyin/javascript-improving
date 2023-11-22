## 闭包
闭包（closure）是一个函数以及其捆绑的周边环境状态（lexical environment，词法环境）的引用的组合。换而言之，闭包让开发者可以从内部函数访问外部函数的作用域。在 JavaScript 中，闭包会随着函数的创建而被同时创建。

闭包是**由函数以及声明该函数的词法环境组合而成的**。该环境包含了**这个闭包创建时作用域内的任何局部变量**。

**词法**（lexical）一词指的是，词法作用域根据源代码中声明变量的位置来确定该变量在何处可用


## 闭包的实用性

**闭包允许将函数与其操作的某些数据（环境）关联起来**。在显然类似于面向对象编程。在面向对象编程中，对象允许我们将某些数据（对象的属性）与一个或多个方法相关联。

因此，通常**使用只有一个方法的对象的地方**，都可以使用闭包

在web中，大部分写的js代码都是基于事件的——定义某种行为，然后将其添加到用户触发的事件之上。这些代码通常作为回调：为响应事件而执行的函数。


### 用闭包模拟私有方法

编程语言中，比如java,支持将方法声明为私有的，即**它们只能被同一个类中的其他方法所调用**

JavaScript没有这种原生支持，但可以**使用闭包来模拟私有方法**。私有方法不仅仅**有利于对代码的访问**，还提供了**管理全局命名空间**的强大能力，**避免非核心的方法弄乱了代码的公共接口部分**。


### 在循环中创建闭包：一个常见错误
var在for循环中变量提升导致循环的闭包共用一个词法环境

解决方式
1. 封装一层回调，为每一个回调创建一个新的词法环境
2. 使用匿名函数，立即把item与回调函数关联起来
3. 使用const创建块级作用域，每个闭包都绑定了块级作用域的变量
4. 使用forEach替代for循环


## 性能考量

如果不是某些特定任务需要使用闭包，在其他函数中创建函数式不明智的，因为闭包在处理速度和内存消耗方面对脚本性能有负面影响
+ 在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中
因为每次构造器被调用时，方法都会被重新赋值一次
```js
 function MyObject (name,message){
            this.name = name.toString()
            this.message =  message.toString()
            this.getName = function(){
                return this.name
            }
            this.getMessage =function(){
                return this.message
            }
        }
```
应该为
```js
 function MyObject1 (name,message){
            this.name = name.toString()
            this.message =  message.toString()
        }
        MyObject1.prototype.getName = function(){
            return this.name
        }
        MyObject1.prototype.getMessage =function(){
            return this.message
        }
```





