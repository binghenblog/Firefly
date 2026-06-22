---
title: 智能合约开发solidity
published: 2026-01-03 11:00:00
category: 编程语言
---
# 智能合约开发solidity

Solidity 是一种**高级、面向合约的编程语言**，专为在 **以太坊虚拟机（EVM）**  上开发智能合约而设计。它由以太坊核心开发者于 2014 年提出，并于 2015 年正式推出，现已成为构建去中心化应用（DApps）、代币（如 ERC-20、ERC-721）、DAO、DeFi 协议等区块链应用的**主流语言**。

|特性|说明|
| ------| ----------------------------------------------------------------------------|
|**面向合约**|代码以 `contract` 为基本单位，类似面向对象中的“类”。|
|**静态类型**|所有变量必须声明类型（如 `uint`​, `address`​, `bool`），编译时检查类型安全。|
|**继承与多态**|支持合约继承（`is` 关键字）、函数重写、抽象合约等 OOP 特性。|
|**编译为字节码**|Solidity 源代码通过编译器（`solc`）编译为 EVM 可执行的字节码，部署到区块链上。|
|**确定性执行**|所有节点执行相同代码必须得到相同结果，因此​**禁止随机数、时间依赖（需谨慎使用** **​`block.timestamp`​**​ **）等非确定性操作**。|

## 数据类型

### 布尔类型

布尔类型用 bool 关键字声明，此数据类型的有效值为 true 和 false

bool 的默认值为 false

声明和赋值 bool 数据类型的代码为：

```solidity
bool isAcitive; //不带默认值
bool isOk=false; //带默认值
```

布尔类型支持的运算符

|逻辑运算符||关系运算符||
| -------------------------------------| --------------------| -------------------------------------| --------------------|
|&&|逻辑与(and)|==|等于|
|!|逻辑非|!=|不等于|
|\|\||逻辑或(or)|||

示例

```solidity
// SPDX-License-Identifier:GPL-3.0
pragma solidity ^0.4.23;
contract BooleanTest{
    bool _a;
	function getBool() public view returns(bool){
        return !_a;
    }
}
```

### 整型

整数有利于将数字存储在合约中

有两种类型的整数

有符号的整数(`int`)：带符号的整数可以同时具有负值和正值。

无符号的整数(`uint`)：无符号整数只能保持正值和零。

整型的关键字有 int8、int16、到 int256，数字以 8 步进。对应的无符号整型有 uint8 到 uint256，uint 和 int 默认对应的是 uint256 和 int256。

如果忽略后面的数字，则默认为 256

uint8 对应的值为：0~255

int8 对应的值为：-128~127

#### 整型支持的运算操作

有比较运算符、位运算符和算数运算符三种

|比较运算符(返回布尔值 true 或 false)|位运算符|算数运算符|
| ------------------------------------| ---------| ---------------|
|<=（小于等于）|&（与）|+（加）|
|<（小于）|\|（或）|-（减）|
|==（等于）|^（异或）|一元运算符“-”|
|!=（不等于）|~(位取反)|一元运算符“+”|
|>=（大于等于）||\* (乘)|
|>（大于）||/(除)|
|||% (取余)|
|||\*\* (幂)|
|||\<\< (左移位)|
|||\>\> (右移位)|

> [!NOTE] ✏️ 注意
> • 整数除法总是截断的。单如果运算的是常量(常量后面的内容会讲到 )，则不会截断。
>
> • 整数除 0 会抛异常，即 x/0 为非法的。
>
> • 右移位和除是等价的，如 x \* 2\*\*y 是相等的。移位运算的结果的正负取决于运算符左边的数。 右移位一个负数边的数。右移位一个负数，向下取整时会为 0。
>
> • 不能进行负移位，即运算符右边的数不可以为负数，否则会抛出运行时异常，如 3 \>\> -1 为 非法的。
>
> • 有符号整数是不能够使用"\*\*"操作。

有符号和无符号整数的缺省值为零，在声明时他们会自动初始化，声明方式如下

```solidity
int8 x = -1;
uint16 y = 1;
uint32 z;
```

示例：

```solidity
pragma solidity ^0.8.0;

contract IntExample {
    int8 x = -1;     // 占用 1 字节逻辑上，但存储按 32 字节对齐
    int256 a = 8;    // 等价于 int a = 8;

    function getValues() public view returns (int8, int256) {
        return (x, a);
    }
}
// 调用 getValues() 会返回 (-1, 8)。
```

```solidity
// SPDX-License-Identifier: GPL-3.0
// 推荐使用编译器0.4.23或兼容的更高版本(但低于0.5.0)
pragma solidity ^0.4.23;

contract UintTest{
	uint a=10;
	uint b=2;
	function getUint() public view returns(uint){
	// public 公共函数可被外界调用
	// view 只读函数，不修改区块链状态
	// returns(uint) 返回一个uint类型的值
		uint sum=a**b+3%2;
		return sum;
	}
}
```

### 地址类型

• 地址类型是以太坊的一个特有类型，它是一个 160 位二进制的数，不同于 Bitcoin 的 UTXO 模型，以太坊交易是以其特定的账户模型，每个账户都有其对应的地址。

• 私钥是一个 32 个字节的数、256 位的二进制数，也就是 64 位的十六进制数。公钥是 由私钥生成的，私钥是对一个信息进行签名，公钥用来验证合法性。

• 地址(这里指的是 ETH 地址)是把公钥用 sha256 hash 之后， 取其后 160 位生成的 16  进制字符串(40 个字符)再加上前缀“0x” (总共 42 位) 。

• 地址是所有合约的基础，所有的合约都会继承地址对象，通过合约的地址串，调用合约 内的函数。

#### 地址类型的声明有两种形式

address：保存一个 160 位(20 个字节)，一般表示成 40 个十六进制数(以太坊地址的大小)，由于一个字节等于 8 位，所以地址也可以使用 uint160 来声明

address payable：可支付地址，与 address 相同，不过有成员函数 transfer 和 send。这种区别背后的思想史 address payable 可以接受以太币的地址

#### 地址类型支持的运算符

地址类型也有成员。地址是所有合约的基础(基类)，即合约也可以是一个类并且继 承自地址类型。从 Solidity 0.5.0 版本开始，合约将不再继承自地址类型，但会保 留显式转换为地址。

地址类型支持的运算符有： \< \=、 \<、 \= \=、! \=、 \> \=、 \>

示例：

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.0;
// 定义一个名为Addr的合约
contract Addr {
	// 声明一个公共变量 类型为address，并初始化为一个固定的以太坊地址
	address public addr = 0x8cC758f5a41bdF6Ab749944c737F86e6a4B4070B;
	function getsenderaddr() public view returns(address){
		return msg.sender;
	}
}
```

### 数组

数组是一种数据结构，是存储同类元素的有序集合。数组中的特定元素由索引访问，索引值从 0 开始。

在 Solidity 中，可以支持编译定长数组和变长数组。一个类型为 T，长度为 k 的数组，可以声明为 T[k]，而一个变长的数组则声明为 T[ ]

|类型|声明方式|特点|
| --------| --------| --------------------------------|
|静态数组|​`uint[5] arr;`|长度固定，编译时确定，gas 效率高|
|动态数组|​`uint[] arr;`|长度可变，需要用 `.push()` ​添加元素|

#### 创建数组-使用字面量创建数组

语法：`type [arraySize] arrayName;`

通过数组字面量，创建的数组是 memory 的，同时还是定长的，例：

```solidity
// 声明一个静态数组，类型uint[10]表示包含10个元素的数组，每个元素都是uint256
// 所有元素默认初始化为0(因为uint的默认值为0)
uint[10] balance;
// 声明一个长度为3的uint数组a，并初始化为[1,2,3]
uint[3] a = [1,2,3];
// 赋值语句(将数组testarray的第0个元素设为1)，如果testarray没有声明，则编译器会报错
testarray[0] = 1
// 非法！长度不匹配，编译器会报错
// 左边的uint[5]是声明了一个长度为5的数组，右边只提供了三个元素
uint[5] x = [uint(1),3,4];
```

#### 创建数组-使用 new 关键字创建数组

可以省略数组长度，定义为变长数组：`uint [] balance = [1,2,3];`

对于边长数组，在初始化分配空间前不可使用，可以通过 new 关键字来初始化一个数组，但是必须声明长度，并且声明后长度不能变。

```solidity
// 声明一个动态数组，元素类型为uint，
// 使用new uint[](7)在内存或存储中创建一个长度为7的数组
uint [] testarray = new uint[](7);
// 声明一个动态字节数组 _data，类型为bytes
// new bytes(10)创建一个长度为10字节的bytes数组
// 每个字节初始化为0x00
bytes public _data = new bytes(10);
// 声明一个字符串数组adarr1，可容纳4个string元素
// 每个string元素本身是动态长度的UTF-8编码字符串
// 数组中每个string初始值为空字符串""
string [] adarr1 = new string[](4);
```

变长数组需要一个一个元素的赋值对于 memory 的变长数组，不支持修改 length 属性，来调整数组大小。memory 的变长数组虽然可以通过参数灵活指定大小，但一旦创建，大小不可调整。

```solidity
// 创建一个动态数组a，长度为7（长度不可变）
uint[] memory a = new uint[](7);
a.lenth = 8;  // 不可调整数组大小，编译错误
a.push(32)  // 大小不可调整，编译错误
```

|操作|​`memory` 数组|​`storage` 数组|
| ------------| ---------------------| -------------------------|
|​`new T[](n)`|✅ 支持|✅ 支持（但通常直接声明）|
|修改 `.length`|❌ 不支持（任何版本）|❌ ​**0.6.0+ 禁止**（旧版允许但危险）|
|​`.push()`​ / `.pop()`|❌ 不支持|✅ 支持（0.8.0+ 安全）|
|大小是否可变|❌ 固定|✅ 可变|

> [!NOTE] ✏️ 记忆口诀
> **Memory 数组：创建即定型，不能增不能减。**
>
> **Storage 数组：可用 push/pop，灵活又安全（0.8+）。**

#### 数组成员

数组成员有：`length`​、`push()`​、`push(x)`​、`pop()`

length属性：表示当前的数组长度，对于存储在storage的变长数组，可以通过给.length赋值调整数组长度。

push方法：变长数组拥有push(x)成员，可以在数组最后添加一个x元素。

pop方法：变长数组具有pop()成员，可以提出数组最后一个元素。

```solidity
uint[] memory a = new uint[](7);
a.length=8 //这是不允许的
uint[] storage sa;
sa.push(32); //只有 storage 可以 push,因为他的大小不固定,而 memory 中的一旦声明就固定下来了
```

示例：

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;
contract ArrayTypes {
	// 固定长度(静态)数组
	uint[8] array1;  // 8个uint256，初始全为0
	bytes1[5] array2;  // 5个bytes1(每个1字节)，初始全为0x00
	address[100] array3;  // 100个地址，初始全为0x000...000
	// 动态数组
	uint[] array4;  // 动态uint数组(初始长度=0)
	bytes1[] array5;  // 动态bytes1数组
	address[] array6;  // 动态address数组
	bytes array7;  // 动态字节数组(高效)
	// 初始化时分配大小的动态数组
	uint[] array8 = new uint[](5);  // 创建长度为5的uint动态数组(全为0)
	bytes array9 = new bytes(9);  // 创建长度为9字节的bytes(全0x00)
	function initArray() public pure returns(uint[] memory){
		uint[] memory x = new uint[](3);
		x[0] = 1;
		x[1] = 3;
		x[2] = 4;
		return(x);
	}
	function arrayPush() public returns(uint[] memory){
		uint[2] memory a = [uint(1),2];
		array4 = a;  // 错误，类型不匹配！
		array4.push(3);
		return array4;
	}
}
```

### 变长字节数组

#### 数组类型

• 数组的大小既可以有固定的，也可以实现动态改变。

• bytes 和 string 是⼀种特殊的数组。bytes 类似于bytes[] ，但在外部函数作为参数 调⽤中，会进行压缩打包，更省空间， 所以应该尽量使用bytes 而不是bytes[]。

• bytes1\~bytes32 表示创建固定字节大小的数组，不可修改。在不确定字节数据大小的 情况下，通常可以使用string 或者 bytes。

• bytes 和 string 都可以用来表达字符串，他们的区别是 bytes 用来存储任意长度的字节 数据，string 用来存储任意长度(UTF-8 编码)  的字符串数据。

#### bytes和string的成员类型

- length 属性

 bytes 拥有 length 属性， string 可以转换为 bytes 以通过 length 获得它的字节长度。

- push 方法

 存储在storage 的 bytes 有 push 成员方法 ，string 没有 push 方法。

- push(x)方法

 bytes 拥有 push(x)成员。 string 可以通过索引来修改对应的字节内容，通过push 方 法来增加字节内容。

- pop()方法

 bytes 拥有 pop()成员， 可以移除数组最后一个元素。

示例：

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;
contract ElongateArray {
	// 声明一个字符串类型的变量name1，初始化为a!+&500
	// 共7个字符："a","!","+","&","5","0","0"
	string name1="a!+&500";
	// 声明一个动态数组name2，类型为bytes
	// 创建一个长度为1的数组
	bytes[] name2=new bytes[](1);
	// 将string name1转换为bytes并返回
	function name() public view returns(bytes memory){
		return bytes(name1);
		// 输入a!+&500
		// 输出0x61212b26353030
	}
	// 返回两个uint值
	function namelength() public view returns(uint,uint){
		// 字符串name1的字节长度(不是字符数)
		// 数组name的元素个数(不是总字节数)
		return (bytes(name1).length,name2.length);
	}
}
```

### 结构体

#### 结构体类型

• 结构体是一种数据类型，该数据类型由一组称为成员的不同数据组成，其中每个成员可以具有不同的类型。

• 结构体通常用来表示类型不同但是又相关的若干数据。结构体和其他类型基础数据类型一 样，例如 int 类型、bool 类型，只不过结构体可以做成你想要的数据类型。以方便日后的使用。

结构体类型--声明

声明方式：

```solidity
// 通用结构体定义语法
struct struct_name {
	type1 type_name_1;
	type2 type_name_2;
	type3 type_name_3;
}
// 具体结构体定义
struct test1{
	bool memberBool;
	uint memberUint;
}
```

注意：

1. 结构体的限制

    结构体目前仅支持在合约内部使用或继承合约内使用，如果要在参数和返回值中使用结构体，函数必须声明inertnal。目前，如果想在合约之间传递结构体，则必须对结构体成员进行拆解才行

    ```solidity
    // 合法
    function interFun(test1 tt) internal {}
    // 非法
    funciton exterFunc(test1 tt) public {}
    ```

2. 访问结构体成员

    要访问结构的任何成员，使用成员访问操作符(.)。

示例：

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;
contract structure {
	// 定义结构体
	struct Book {
		string title;
		string author;
		uint book_id;
	}
	// 状态变量声明，声明一个状态变量book，类型为Book
	Book book;
	// setBook()--初始化结构体
	function setBook() public {
		book = Book('LearnSolidity', 'ProgrammingLanguage', 1);
	}
	// getBookId()--只读查询
	function getBookId() public view returns (uint) {
		return book.book_id;
	}
}
```

### 映射结构

#### 映射类型

Solidity 映射类型和Java的Map或Python的Dict功能相似，是一种键值对的映射关系存储结构，定义方式中， \_KeyType 可以是任何内置类型，或者bytes和字符串。不允许使用引用类型、合约和枚举。 \_ValueType 可以是任何类型。mapping 为映射关键字，name为映射变量名。

语法：`mapping(_KeyType=>_KeyValue) name;`

映射是一种使用广泛的类型，经常在合约中充当一个类数据库的角色，比如在代币合约中用映射来存储账户的余额，在游戏合约里可以用映射来存储每个账号的级别：

```solidity
// 声明一个名为balances的映射
mapping(address => uint) public balances;
mapping(address => uint) public userLevel;
```

规则1：映射的_KeyType只能选择Solidity默认的类型。而_ValueType可以使用自定义的类型

规则2：映射的存储位置必须是storage

规则3：如果映射声明为public，那么Solidity会自动给你创建一个getter函数，可以通过Key来查询对应的Value

规则4：给映射新增的键值对的语法为_Var[_Key] = _Value，其中_Var是映射变量名，_Key和_Value对应新增的键值对。

示例：

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;
contract MappingTest {
	// 声明一个公共映射，键Key：address，值value：uint
	mapping(address => uint) public balances;
	// 接受一个参数amount，将调用者地址(msg.sender)在balances映射中的值设为amount
	function update(uint amount) public returns (address){
		balances[msg.sender] = amount;
		// 返回调用者的地址
		return msg.sender;
	}
}
```

## 变量

solidity是一种静态类型语言，这意味着需要在声明期间指定变量类型。每个变量声明时，都有一个基于其类型的默认值。

没有undefined或null的概念。

支持三种变量类型：

- **状态变量** -- 变量值永久保存在合约存储空间中的变量。
- **局部变量** -- 变量值仅在函数执行过程中有效的变量，函数退出后，变量无效。
- **全局变量** -- 保存在全局命名空间，用于获取区块链相关信息的特殊变量，提供有关区块链和交易属性的信息。

### 命名规则

变量是自命名的，但在位变量命名时，请记住以下规则：

- Solidity不能使用保留关键字作为变量名

例如：break或boolean变量名无效。

- 不应以数字开头，必须以字母或下划线开头。

例如：123test(无效)，但是_123test(有效)

- 变量名区分大小写

例如：Name和name是两个不同的变量

> [!TIP] 💡 提示
> 习惯上函数里的变量都是以(_)开头(但不是硬性规定)以区分全局变量。在函数名字后面使用关键字private即可，私有函数名字用()下划线起始，而共有函数不需要下划线开头，这属于命名规范，我们可以通过这些区分合约中那些函数是私有的

### 变量的默认值

**变量在声明后会用全零字节作为默认值**，也就是所有类型的默认值都是零态，比如bool的默认值为false，uint和int的默认值是0，对于变长的数组bytes和string默认值则为空数组和空字符串。

### 状态变量

状态变量声明在合约中，函数外。

状态变量是被永久的保存在合约中的，也就是说他们被写入以太坊区块链中。状态变量是数据存储在链上的变量，说有合约内函数都可以访问，gas消耗高。

```solidity
contract Example{
	// 这个无符号整数将会永久的被保存在区块链中
	uint public myUnsignedInteger = 100;  // 定义这个为uint类型，并赋值100
}
```

#### 状态变量的作用域

状态变量可以在声明时进行初始化，并且具有以下可见性：

- private：状态变量仅在定义的合约里可见
- public：状态变量也可以在定义合约的外部访问，因为编译器会自动创建一个与该变量同名的getter函数。
- internal：状态变量在定义的合约以及所有继承合约都是可见的。

可见性指示符放在状态变量的类型之后，如果未指定，则状态变量将被是为internal

示例：

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;
contract StateVariable {
	uint public stateVar1 = 10;
	// 不加public表示只能在本合约及其子合约中访问，外界无法直接读取
	uint stateVar2 = 20;
	// view：表示该函数是只读的状态
	function doSomething() public view returns (uint) {
		return stateVar2;
	}
}
```

### 局部变量

局部变量的声明：变量值仅在函数执行过程中有效的变量为局部变量，局部变量声明在函数内。

局部变量的存储范围：局部变量的作用域仅限于定义它们的函数。函数退出后，变量无效，不会写入到区块链中。局部变量的数据存储在内存里，不上链，gas低。

```solidity
contract Example {
	function getResult() public view returns(uint){
		uint storedXlbData; // 局部变量
	}
}
```

示例：

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;
contract LocalVariable{
	// pure：状态可变性修饰符，表示不读取不修改任何状态变量，所有操作仅依赖于输入参数或局部变量
	function returnuint() public pure returns(uint){
		uint a = 5;
		return a;
	}
}
```

### 全局变量

全局变量保存在全局命名空间，用于获取区块链相关信息的特殊变量，提供有关区块链和交易属性的信息。

全局变量时全局范围工作的变量，都是Solidity预留关键字。他们可以在函数内不声明直接用。

|语法|解释|
| ---------------------------| -------------------------------------------------------------|
|block.basefee (uint)|当前区块的基础费用|
|block.coninbase (address)|当前块矿工的地址，括号中表示返回值的类型|
|block.chainid (uint)|当前链id|
|block.difficulty(uint)|当前块的难度|
|block.gaslimit (uint)|当前块的gaslimit|
|block.number (uint)|当前区块的块号|
|block.timestamp(uint)|当前块Unix时间戳(从1970/1/1 00:00:00  UTC 开始所经过的秒数)|
|msg.sig (bytes4)|调用数据(calldata)的前四个字节|
|msg.data (bytes)|完整地调用数据(calldata)|
|msg.sender (address)|当前调用发起人的地址|
|msg.value (uint)|这个消息所附带的以太币，单位为wei|
|tx.gasprice(uint)|交易的gas价格|
|tx.origin(address)|交易的发送者(全链调用)|

示例：

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;
contract GlobalVariable{
	// 状态变量声明，类型为address
	address public coinbase;
	// payable：表示该函数可以接受以太币(ETH)
	function t () payable public {
		// 将当前区块的矿工地址(或共识层的提议者地址)赋值给状态变量coinbase
		coinbase = block.coinbase;
	}
}
```

## 函数

### 函数概念

在Solidity中，函数写在合约内部，一个合约中可以有多个函数，函数由关键字function声明，后面跟函数名、函数参数、可见性、返回值的意义。

定义函数的语法如下：

```solidity
// 函数修饰词、returns(函数参数)可省略
// 参数类型参数名 可省略
function 函数名称(参数类型 参数名称) 可见性 函数修饰词
returns (返回参数类型返回 参数名称){
// 函数体
} 
```

```solidity
// getBrand()：函数名称
// public view：函数类型
// returns (string)：返回类型
function getBrand() public view returns (string){
	return brand;
}
```

### 函数参数

#### 输入参数

输入参数的声明方式与变量相同，未使用的参数可以省略变量名称。

假设希望合约接受一种带有两个整数参数的外部调用：

```solidity
function taker(uint _a, uint _b) public pure{
// 使用_a和_b
}
```

#### 输出参数

在returns关键字之后，可以用与输入参数相同的语法声明输出参数，输出参数的变量名可以省略。输出值可以使用return语句指定，返回参数初始化为0，如果未显式设置，它们会保持为0。与参数类型相反，返回类型不能为空——如果函数类型不需要返回，则需要删除整个returns()部分。

```solidity
// 假设希望显式的返回两个结果，即两个给定整数的和、积，则可以这样写：
function arithmetics(uint _a,uint _b) public pure
returns(uint,uint){
	uint o_sum = _a + _b;
	uint o_product = _a * _b;
	return (o_sum,o_product);
}
```

示例：

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;
contract Param{
	function arithmetics(uint _a,uint _b) public pure returns(uint,uint){
		uint o_sum = _a + _b;
		uint o_product = _a * _b;
		return (o_sum,o_product);
	}
}
```

### 函数的可见性

Solidity 对函数和状态变量提供了四种可见性： 分别是`external`​、`public`​、`internal`​、`private`。

其中函数默认的可见性是 public；状态变量默认的可见性是Internal ，状态变量不能设置为external。

- private： 意味着它只能被合约内部调用；
- nternal： 就像private 但是也能被继承的合约调用；
- external： 只能从合约外部调用；
- public： 可以在任何地方调用，不管是内部还是外部。

示例：

函数可见性分析external--代码解析

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;
contract ExternalTest{
	function externalFunc() external pure returns(uint a){
		return 10;
	}
	function callFunc() public view returns(uint){
		//1. 以internal 的方式调用报错
		//return externalFunc();
		//2. 以external 的方式调用函数
		return this.externalFunc();
	}
}
```

函数可见性分析external--代码解析

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;
contract ExternalTest{
	uint public test=20;
	function publicFunc() public pure returns(uint){
		return 10;
	}
	function callFunc1() public pure returns(uint){
		//1. 以internal 的方式调用函数
		return publicFunc();
	}
	function callFunc2() public view returns(uint){
		//2. 以external 的方式调用函数
		return this.publicFunc();
	}
	function callFunc3() public view returns(uint){
		//3. 以internal 的方式调用状态变量
		return test;
		return this.test();
	}
}
```

函数可见性分析internal--代码解析

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;
contract ExternalTest{
	uint internal test=20;
	function InternalFunc() internal pure returns(uint){
		return 10;
	}
	function callFunc1() public pure returns(uint){
		//以internal 的方式调用函数
		return InternalFunc();
	}
	function callFunc2() public view returns(uint){
		//以internal 的方式调用状态变量
		return test;
	}
}
//派生合约
contract ExternalCall is ExternalTest{
	function callFunc3() public pure returns(uint){
		//以internal 的方式调用函数
		return InternalFunc();
	}
	function callFunc4() public view returns(uint){
		//以internal 的方式调用状态变量
		return test;
	}
}
```

函数可见性分析private--代码解析

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;
contract ExternalTest{
	uint private test=20;
	function privateFunc() private pure returns(uint){
		return 10;
	}
	function callFunc1() public pure returns(uint){
		//以internal 的方式调用函数
		return privateFunc();
	}
	function callFunc2() public view returns(uint){
		//以internal 的方式调用状态变量
		return test;
	}
}
//派生合约
contract ExternalCall is ExternalTest{
	function callFunc3() public pure returns(uint){
		//以internal 的方式调用函数
		return InternalFunc();
	}
	function callFunc4() public view returns(uint){
		//以internal 的方式调用状态变量
		return test;
	}
}
```

### view函数

在Solidity 中， 如果一个函数不修改合约状态，它只是读取区块链的状态而不改变它， 那么可以将该函数应该声明为view  (视图)函数，使用view 函数不消耗gas。

若有函数 有以下操作，则不能用view 声明：

- 修改状态变量
- 产生事件
- 创建其它合约
- 使用selfdestruct
- 通过调用发送以太币
- 调用任何没有标记为view 或者pure 的函数
- 使用底层调用
- 使用包含特定操作码的内联汇编

```solidity
function f() public view returns (uint){
}
```

示例：

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;
contract ViewTest{
	function f(uint a, uint b) public view returns (uint) {
		return a * (b + 42) + block.timestamp;
	}
}
```

### pure函数

Solidity 语言有两类和状态读写有关的函数类型，一类是view 函数，另一类是pure (纯 ) 函数。他们的区别是 view 函数不修改状态， pure 函数不修改状态也不读取状态。和 view 函数一样，使用pure函数也不消耗gas。如果函数中存在以下语句，则被视为读取状态：

- 读取状态变量。
- 访问address(this).balance 或者 .balance。
- 访问block ，tx， msg 中任意成员 (除msg.sig 和msg.data 之外)。
- 调用任何未标记为pure 的函数。
- 使用包含某些操作码的内联汇编。

```solidity
function f() public pure returns (uint){
}
```

示例：

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;
contract PureTest{
	function f(uint a, uint b) public pure returns (uint) {
		return a * (b + 42);
	}
}
```

### 构造函数

构造函数是特殊的函数，在部署合约的时候，就会被调用。而且只能够在此时被调用。常 常用于对于某一些状态变量的初始化。0.4.22 版本及之后，采用了全新的constructor 写法， 使用关键词constructor 作为构造函数：

```solidity
contract test{
	constructor(){} 
}
```

构造函数不需要指明可见性，构造函数的可见性只可以是public ，但不需要指明。

特性：

- 一个合约只能有一个构造函数。
- 构造函数在创建合约时执行一次，用于初始化合约状态。
- 在执行构造函数之后，合约最终代码被部署到区块链。合约最终代码包括公共函数 和可通过公共函数访问的代码。构造函数代码或仅由构造函数使用的任何内部方法不包括 在最终代码中。
- 构造函数可以是公共的，也可以是内部的。
- 内部构造函数将合约标记为抽象合约。
- 如果没有定义构造函数，则使用默认构造函数。
- 如果基合约具有带参数的构造函数，则每个派生/继承的合约也都必须包含参数。
- 如果派生合约没有将参数传递给基合约构造函数，则派生合约将成为抽象合约。

```solidity
// 默认构造函数
contract test{
constructor(){}
}
```

示例：

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;
contract MyContract{
	string str;
	// 构造函数
	// 将状态变量str初始化为"Hello world"
	constructor() {
		str = "Hello world";
	}
	// 公共只读函数
	function getValue() public view returns (string memory) {
		return str;
	}
}
```

## 数据存储位置

### 特性

- 在合约中声明和使用的变量都有一个数据位置，指明变量值应该存储在哪里。合约变量的数据位置将会影响Gas消耗量。在Solidity中，有两个地方可以存储变量：存储(Storage)以及内存(Memory)
- Storage变量是指永久存储在区块链中的变量。
- Memory变量则是临时的，当外部函数对某合约调用完成时，内存型变量即被剔除。内存(Memory)位置还包括2种类型的存储数据位置，一种是calldata，一种是栈(stack)

### Storage/Memory

- 该存储位置存储永久数据，这意味着该数据可以被合约中的所有函数访问。可以把它视为计算机的硬盘数据，所有数据都永久存储。 保存在存储区(Storage)中的变量，以智能合 约的状态存储，并且在函数调用之间保持持久性。与其他数据位置相比，存储区数据位置 的成本较高。
- 内存位置是临时数据， 比存储位置便宜。它只能在函数中访问。 通常，内存数据用于 保存临时变量，以便在函数执行期间进行计算。一旦函数执行完毕，它的内容就会被丢弃。 你可以把它想象成每个单独函数的内存(RAM)。不能将 memory 赋值给局部变量。对于值类型，总是会进行拷贝的。

### Calldata/Stack

- Calldata 是只读的、不可修改的非持久性数据位置，所有传递给函数的值，都存储在这里 。此外，Calldata 是外部函数的参数(而不是返回参数)的默认位置。
- 堆栈是由EVM 维护的非持久性数据。 EVM 使用堆栈数据位置在执行期间加载变量。堆 栈位置最多有1024 个级别的限制，其中每个单元是32 byte，值类型的局部变量是存储在栈上。 stack 即所谓的“运行栈"，用来保存EVM 指令的输入和输出数据。可以免费使用，没有gas 消耗，数量被限制在16 个。

示例：

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;
contract Storagelocation{
	uint[] x;
	function f(uint[] memory Array) public{
		x = Array;
		uint[] storage y = x;
		y[7];
		g(x);
		h(x);
	}
	// 接受storage引用
	function g(uint[] storage storagArray) internal{}
	// 接受memory数组
	function h(uint[] memory Array) public{}
}
```

## 错误及异常处理

- Solidity 处理错误与大多数高级编程语言不同，绝大部分语言通过捕获异常来处理错误， 而Solidity 通过回退状态方式来处理错误，发生异常时会撤销当前调用(及其所有子调用)所改变的状态，同时给调用者返回一个错误标识。
- Solidity 这样处理错误的原因与区块链的特性有关。可以把区块链理解为全球共享的分布式事务性数据库。全球共享意味着参与这个网络的每一个人都可以读写其中的记录。如果想修改这个数据库中的内容，就必须创建一个事务。该事务必须要满足原子性，即要么全做要么全不做。Solidity 错误处理就是要保证每次调用事务的原子性。

### 错误处理方式

- Solidity 提供了 assert 和 require 两个函数来进行条件检查。
- assert 函数通常用来 检查(测试)内部错误，而require 函数用来检查输入变量或合约状态 变量是否满足条件，以及验证调用外部合约的返回值。 另外，如果正确使用assert 函数， 一些Solidity 分析工 具(如SMTChecker)可以帮我们分析出智能合约中的错误。
- 除了可以用assert 和require 以外，还有两种方式可以触发异常：

  - revert 函数可以用来标记错误并回退当前调用，当前剩余的gas 会返回给调用者。
  - 使用throw 关键字抛出异常(从0.4.13 版本， throw 关键字已被弃用)回滚所有状态改变， 返回”无效操作代码错误”，而且消耗掉剩下的gas。

### Assert异常

- 越界或负的序号值访问数组，如i\>\=x.length 或i\<0 时访问x[i]。
- 序号越界或负的序号值访问一个定长的bytesN。
- 被除数为0，如5/0 或23%0。
- 对一个二进制数移动一个负的值，如5\<\<-1。
- 证书进行显式转换为枚举时，将过大值、负值转为枚举类型并抛出异常。
- 调用未初始化内部函数类型的变量。
- 调用assert 的参数为false。

### Require异常

- 调用throw。
- 调用require 的参数为false。
- 通过消息调用一个函数名，但调用过程并没有正确结束。
- 在使用new 创建一个新合约时因为(3)的原因而没有正常完成。
- 调用外部函数时，被调用的对象不包含代码。
- 合约中没有payable 修饰符的public 函数在接收以太币时(包括构造函数和回退函数)会出现异常。
- 合约通过public 的getter 函数接收以太币。
- .tansfer()执行失败。

### 区别

- 两种异常类型的相同点是异常都会撤销所有操作。同时也有如下不同点：
- gas 消耗不同， assert 类型的异常会消耗掉所有剩余的gas，而require 不会消耗剩余 gas，会将剩余gas 返还给调用者。
- 操作符不同， 当发生assert 类型异常时， Solidity 会执行一个无效操作(无效指令0xfe)， 当发生require 类型的异常时， Solidity 会执行一个回退操作(REVERT 指令0xfd)。

### 选择

- require()函数用于：

  (1) 确认有效条件

  (2) 确认合约声明变量是一致的

  (3) 从调用到外部合约返回有效值

- revert()函数用于 :

  处理与 require()  同样的类型，但是需要更复杂处理逻辑的场景，如果有复杂的if/else 逻辑 流，那么应该考虑使用revert() 函数而不是require()。

- assert()函数用于：

  预防本不该发生的事情， 如果发生就意味着合约中存在需要修复的 bug  (比如assert(1 \>  2))。一般地，尽量少使用assert 调用， 一般assert 应该在函数结尾处使用。

### 示例：

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;
contract ErrorTest {
	bool public flag;
	function setFlag(address a) public {
		require(msg.sender == a);
		flag = true;
	}
}
```

---

## 事件（Event）

事件是以太坊的日志机制，用于在合约状态变化时向外发送通知。事件数据存储在交易日志中，不消耗大量存储空间。

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;

contract EventExample {
    // 定义事件（可带索引参数便于过滤）
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Log(string message);

    function send(address to, uint256 amount) public {
        // 触发事件
        emit Transfer(msg.sender, to, amount);
        emit Log("转账成功");
    }
}
```

### 事件的作用

1. **节省 Gas**：相比链上存储（SSTORE），事件日志的成本低约 90%
2. **前端监听**：DApp 前端通过监听事件实时更新 UI
3. **索引检索**：`indexed` 参数允许在链下高效搜索历史事件

### 事件的 indexed 参数

- 最多 3 个 `indexed` 参数（会被主题索引）
- 非 `indexed` 参数存储在日志数据部分（不生成主题）
- `indexed` 参数支持链下过滤查询

```solidity
event Deposit(address indexed sender, uint256 amount);  // sender 可被索引检索
event Transfer(address indexed from, address indexed to, uint256 amount);  // 双索引
```

---

## 修饰器（Modifier）

修饰器用于在函数执行前后自动添加检查逻辑，提高代码复用性。

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;

contract ModifierExample {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // 定义修饰器：只有合约拥有者可以调用
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;  // 继续执行被修饰的函数
    }

    // 带参数的修饰器
    modifier minAmount(uint256 _min) {
        require(msg.value >= _min, "Amount too low");
        _;
    }

    // 使用修饰器
    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function deposit() public payable minAmount(0.01 ether) {
        // 存款逻辑
    }
}
```

### 修饰器与函数的关系

- 修饰器代码在函数体之前执行
- `_;` 表示"继续执行被修饰的函数"
- 可以在 `_;` 前后分别添加逻辑
- 多个修饰器同时使用时，按声明顺序依次执行

```solidity
// 多个修饰器组合
function restrictedAction() public onlyOwner minAmount(1 ether) {
    // 先检查 onlyOwner，再检查 minAmount，最后执行函数体
}
```

---

## 接口（Interface）

接口定义合约的对外"协议"，可以调用其他已部署合约的函数。

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;

// 定义接口
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
}

// 使用接口调用已部署的合约
contract TokenInteraction {
    function getTokenBalance(address tokenAddress, address user) public view returns (uint256) {
        IERC20 token = IERC20(tokenAddress);
        return token.balanceOf(user);
    }

    function transferToken(address tokenAddress, address to, uint256 amount) public returns (bool) {
        IERC20 token = IERC20(tokenAddress);
        return token.transfer(to, amount);
    }
}
```

---

## Fallback 和 Receive 函数

这两种特殊函数用于处理向合约直接发送 ETH 的情况。

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;

contract FallbackExample {
    event LogReceived(address sender, uint256 amount);

    // receive() - 接收纯 ETH 转账（不带 data）
    receive() external payable {
        emit LogReceived(msg.sender, msg.value);
    }

    // fallback() - 调用不存在的函数或 data 不为空时触发
    fallback() external payable {
        // 可以在此处添加逻辑
    }

    // 查询合约余额
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
```

### 处理逻辑

| 交易 calldata | 存在 `receive` | 不存在 `receive` |
|:---:|:---:|:---:|
| 空（纯 ETH） | **`receive()`** 执行 | `fallback()` 执行 |
| 非空（函数调用） | `fallback()` 执行 | `fallback()` 执行 |

---

## ERC20 代币标准

ERC20 是最广泛的同质化代币标准，定义了代币合约需要实现的基本接口。

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;

contract SimpleERC20 {
    string public name = "MyToken";
    string public symbol = "MTK";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 amount);

    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply * 10 ** decimals;
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) public returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) public returns (bool) {
        require(allowance[from][msg.sender] >= amount, "Insufficient allowance");
        require(balanceOf[from] >= amount, "Insufficient balance");
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }
}
```

---

## ERC721 非同质化代币（NFT）

ERC721 是 NFT（非同质化代币）标准，每个代币都是唯一的。

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;

contract SimpleNFT {
    string public name = "MyNFT";
    string public symbol = "MNFT";

    mapping(uint256 => address) public ownerOf;
    mapping(address => uint256) public balance;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    function mint(address to, uint256 tokenId) public {
        require(ownerOf[tokenId] == address(0), "Token already exists");
        ownerOf[tokenId] = to;
        balance[to]++;
        emit Transfer(address(0), to, tokenId);
    }

    function transferFrom(address from, address to, uint256 tokenId) public {
        require(ownerOf[tokenId] == from, "Not the owner");
        ownerOf[tokenId] = to;
        balance[from]--;
        balance[to]++;
        emit Transfer(from, to, tokenId);
    }
}
```

---

## 库（Library）

库是部署一次即可被多个合约复用的代码段，使用 `library` 关键字定义。

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;

// 定义库
library Math {
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a >= b ? a : b;
    }

    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a <= b ? a : b;
    }
}

// 使用库
contract Calculator {
    using Math for uint256;

    function getMax(uint256 a, uint256 b) public pure returns (uint256) {
        return a.max(b);  // 通过 using...for 使用
    }

    function getMin(uint256 a, uint256 b) public pure returns (uint256) {
        return Math.min(a, b);  // 直接使用库名
    }
}
```

---

## 常见开发工具

| 工具 | 用途 |
|------|------|
| **Hardhat** | 最流行的 Solidity 开发框架，内置测试、编译、部署 |
| **Foundry** | 基于 Rust 的极速开发框架，支持 Solidity 编写测试 |
| **Remix IDE** | 浏览器在线 IDE，适合快速原型和学习 |
| **OpenZeppelin** | 经过审计的标准合约库（ERC20、ERC721、权限控制等） |
| **Ether.js / Web3.js** | 前端与智能合约交互的 JavaScript 库 |

### Gas 优化技巧

1. **使用 `uint256` 而非较小的类型**（EVM 以 256 位字对齐，小类型反而产生额外转换开销）
2. **将变量打包到同一个 `uint256` 槽位**（减少 SSTORE 操作）
3. **使用 `calldata` 而非 `memory`**（避免复制数据）
4. **优先使用 `require` 而非自定义错误**（0.8.4+ 可用自定义错误，更省 Gas）
5. **批量操作比多次单操作省 Gas**
6. **使用 Short-circuit 条件顺序**：把最可能 `false` 的条件放在 `&&` 前面
