# Symbol
symbol是一种基本数据类型。
symbol()函数会返回symbol类型的值，该类型具有静态属性和静态方法。
它的静态属性会暴漏几个内建的成员对象；它的静态方法会暴漏全局的symbol注册，且类似于内建对象类，但作为构造函数来说他并不完整，因为它不支持语法 new Symbol()

**每个从Symbol()返回的值都是唯一的**。**一个Symbol值能作为对象属性的标识符**；这是**该数据类型仅有的目的**

## 语法
Symbol([description])

description 可选，字符串类型。对于symbol的描述，用于调试但不是访问symbol本身。

## 描述
description

**不可new  Symbol()** // typerror
围绕原始数据类型创建一个显示包装器对象从es6开始不再被支持，现有的new Boolean String Number因为遗留仍可被创建

如果真想创建一个Symbol包装器对象，可以用Object()函数

var sym = Symbol('foo')
var symObj = Object(sym)

### 全局共享的Symbol

Symbol.for()和Symbol.keyFor()方法从全局的symbol注册表设置和取得symbol

### 在对象中查找Symbol

Object.getOwnPropertySymbols()查找一个给定对象的符号属性时，返回一个symbol类型的数组。注意，每个初始化的对象都没有自己的symbol属性，因此这个数组可能为空，除非已经在对象上设置了symbol属性。

## 属性
+ Symbol.length  0
+ Symbol.prototype 构造函数的原型
内置通用symbol，es5之前未暴漏，代表内部语言行为
+ symbol.iterator 返回对象的默认迭代器的方法
+ symbol.match 正则匹配
+ Symbol.search 正则匹配
+ symbol.replace 匹配字符串
+ symbol.split 拆分
+ symbol.hasIntance 判断对象实例
+ symbol.species 用于创建派生对象的构造器函数
+ symbol.toPrimitive 转为基本数据类型
+ symbol.toStingTag 用于对象的默认描述字符串值

## 方法
+ Symbol.for()
使用给定的key搜索现有的symbol,如果找到则返回symbol，否则将使用给定的key在全局symbol注册表中创建一个新的symbol
+ symbol.keyFor()
从全局symbol注册表中，为给定的symbol检索一个共享的 symbol key


## symbol原型
### 实例属性
+ Symbol.protoype.decription
### 实例方法
+ symbol.prototype.toSource 返回symbol对象的源代码
+ symbol.prototype.toString 返回描述对象的字符串
+ symbol.prototype.valueOf 返回改symbol对象
+ symbol.prototype[@@toPrimitive] 返回symbol对象


### Symbol与for... in迭代
**symbol在for... in 中不可枚举**，另外，object.getOWnPropertyNames() 不会返回symbol对象的属性，但可以用Object.getOwnPropertySymbols()得到他们


### **JSON.strinify 时，symbol作为键的属性会被完全忽略**

### Object包装器作为对象属性的键时，这个对象将被强制转换为他包装过的symbol值
   objsym[Object(sym)] ==  objsym[sym]




## 应用场景
1. 使用symbol作为对象属性名
symbol类型的key不能通过object.keys和for...in来枚举，可以把一些不需要对外操作的属性用symbol来定义。 （JSON.stringify也会排除在外）

可以利用这一点来更好的设计我们的数据对象，区分**对内操作** 和 **对外选择性输出**

2. 使用symbol替代唯一常量
```bash
const TYPE_AUDIO = Symbol()
const TYPE_VIDEO = Symbol()
const TYPE_IMAGE = Symbol()
```
直接定义唯一值的常量，比如switch case


