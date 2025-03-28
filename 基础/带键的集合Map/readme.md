映射：
Map对象：
es6引入一个新的数据结构来讲一个值映射到另一个值。
一个map对象就是一个简单的**键值对映射集合**，可以按照插入时的顺序遍历所有的元素。

Map和Object的比较
object必须是string类型，**map键可以设置任意类型**
尺寸：object.keys.length，**map.size**直接获取
map的**遍历遵循元素的插入顺序**
object有原型，所以映射中有一些缺省的键（map=object。create(null)回避）


使用map的情形：
键在运行时才能知道类型，或者所有的键相同
如果将原始值存储为键，map没有限制键类型

使用object情况：
如果需要对个别元素进行操作



WeakMap对象
该对象是键值对的集合，它的**键必须是对象类型**，值可以是任意类型。它的键被弱保持，也就是说，当其键所指对象没有其他地方引用的时候，它会被 GC 回收掉。WeakMap提供的接口与Map相同。



与Map对象不同的是，**WeakMap的键是不可枚举的**。不提供列出其键的方法。列表是否存在取决于垃圾回收器的状态，是不可预知的。


Set对象
set对象是**一组值的集合**，这些**值是不重复**的，可以按照添加顺序来遍历

for of 遍历 
for in不行

数组和集合的转换
**array.form(set)**   或**[...set]**
net Set(arr)

Array和Set对比

数组中用于判断元素是否存在的indexOf 函数效率低下。**set.has**
Set对象允许根据值删除元素，而数组中必须使用基于下标的  splice 方法。 **set.delete**
数组的indexOf方法无法找到NaN值。 set.has
Set对象存储不重复的值，所以不需要手动处理包含重复值的情况

WeakSet对象
WeakSet对象是**一组对象的集合**。WeakSet中的**对象不重复且不可枚举**。

与Set对象的主要区别有：

WeakSets中的值必须是**对象类型**，不可以是别的类型
WeakSet的“weak”指的是，对集合中的对象，如果不存在其他引用，那么该对象将可被垃圾回收。于是不存在一个当前可用对象组成的列表，所以 **WeakSets不可枚举**

WeakSet的用例很有限，比如使用 DOM 元素作为键来追踪它们而不必担心内存泄漏。

