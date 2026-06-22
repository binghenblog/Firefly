---
title: Python
published: 2025-03-29 22:00:00
category: 编程语言
---

# 1. Python简介

Python 是一个高层次的结合了解释性、编译性、互动性和面向对象的脚本语言。

python是一种解释型语言、交互式语言、面向对象语言。

写此文档时python版本为3.13.2(此时最新版)

Python官网：https://www.python.org

集成开发环境：推荐：[PyCharm](https://www.jetbrains.com/zh-cn/pycharm/)和[VSCode](https://code.visualstudio.com/)

python的优点：简洁、风格统一、简单易学、开源、可移植性好、可扩展性好、库丰富、通用灵活、具有良好的中文支持

python的缺点：相对于编译型语言(如：C++、java等)的程序，python程序的运行速度较慢

## 1.1 Python模块

python支持以模块的形式组织和管理代码，一个扩展名为.py的文件成为一个模块，文件的名称为模块的名称。python内置了一些标准模块，标准模块可以直接导入程序中使用，而第三方模块需要先安装后使用。

第三方模块的安装需要用到pip工具。pip工具是python模块、包或库的一个通用的管理工具，提供查找、下载、安装、卸载python模块、库或包的功能。

使用pip工具安装模块的命令由三种，如下

```cmd
pip install 模块名
pip install 模块名==版本号
pip install 模块名1 模块名2 模块名3...
```

上述命令中，第一个用于安装最新版本的模块；第二个用于安装指定版本号的模块；第三个命令用于一次性安装多个模块，多个模块用空格来分隔。

使用`pip list`命令可以查看当前开发环境中已经安装的模块和版本号。

在使用模块之前需要先将模块导入到当前程序。python程序中使用`import`语句导入模块，该语句支持一次导入一个模块，也可以一次导入多个模块。

使用`import`语句导入模块的语法格式如下

```python
import 模块1, 模块2, ...
```

当模块导入后，可以通过点字符“.”使用模块中的内容，

```
模块.变量
模块.函数
模块.类
```

使用点字符可以避免在多个模块中存在同名变量、函数或类的情况下代码产生歧义，若不存在同变量、函数或类，则可以使用`from 模块名 import...`直接将模块中的指定内容导入程序，并在程序中直接使用模块中的内容。

# 2. Python基础

## 2.1 注释

注释是代码中的辅助性文字，用于表示代码的含义与功能，提高代码的可读性。注释在程序执行时会被python解释器自动忽略，不会对程序产生任何影响。(注释是给人看的，以防自己写的代码自己都看不懂)

注释分为单行注释和多行注释

单行注释以`#`开头，后面写文字，多行注释由`三对双引号或单引号`包裹的内容

```python
# 单行注释
'''
多行注释
'''
```

## 2.2 缩进

python使用缩进来确定代码之间的逻辑关系和层次关系，缩进指的是一行代码之前的空白区域。`一般使用4个空格表示一级缩进`

## 2.3 语句换行

在python中，如果一条语句过长而无法在一行内完整显示，那么就可以通过换行将这一条语句分成多行显示，从而提高代码的可读性。(一行代码过长看的也费劲)python官方建议一行代码的长度不要超过79个字符，若超过就最好进行换行显示。

有两种方法：在未结束的代码后面加上反斜杠`\`或者使用小括号包裹代码

```python
result = side_01 + side_02 > side_03 or \
		side_02 + side_03 > side_01 or \
		side_01 + side_03 > side_02
```

```python
result = (side_01 + side_02 > side_03 or 
		side_02 + side_03 > side_01 or 
		side_01 + side_03 > side_02)
```

## 2.4 标识符和关键字

标识符(可以理解为变量名)的规则

1. 标识符有字母、数字或下划线组成，且不能以数字开头

2. 标识符区分大小写

3. 不允许使用关键字作为标识符

标识符命名建议：知名知意

命名格式规则有些俗成的规则(不遵守也没事)

1. 变量名使用小写
2. 常量名使用大写
3. 类名使用以大写字母开头的单个或多个的单词

## 2.5 关键字

关键字是python已经使用的且不允许开发人员重复定义的标识符，一共35个关键字。

这些关键字全部存储在keyword模块的变量kwlist中

```python
import keyword
print(keyword.kwlist)
```

```
['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
```

python中的关键字都有不同的作用，可以通过`help("关键字")`可以查看关键字的详细信息

## 2.6 变量和数据类型

### 2.6.1 变量

标识内容单元的标识符又称为变量名，python通过赋值运算符“=”将内存单元中存储的数据与变量名建立联系，即定义变量，具体语法格式如下

```
变量名 = 值
```

当定义了一个变量并将以个值赋给它时，python会在内存中为该值分配一个合适大小的内存单元，并将变量与内存单元进行关联。

### 2.6.2 数据类型

python中常用的数据类型分为两类：数字类型和组合数据类型。

其中组合数据类型包括字符串类型、列表类型、元组类型、集合类型、字典类型等

1. 数字类型

   数字类型分为：整数类型(int)、浮点型(float)、复数类型(complex)和布尔类型(bool)

   其中整数、浮点、复数分别对应数学中的整数、实数、复数，布尔值为真(True)或假(False)

   ```python
   123    # 整数
   -122    # 整数
   3.123    # 浮点数
   4.2E-10    # 浮点数
   3.12+1.23j    # 复数类型
   True    # 布尔类型
   False    # 布尔类型
   ```

2. 字符串类型

   字符串类型用于表示文本数据，由单引号、双引号或三引号包裹的一系列字符

   ```python
   '单引号'
   "双引号"
   '''三引号'''
   ```

3. 列表类型

   列表类型可以保存任意数量、任意类型的元素，这些元素是`有顺序`、`可以重复`，并且`可以被修改为其他元素`。

   python中一般使用中括号`[]`创建列表，其中可以放入多个元素，多个元素以英文逗号进行分隔。

   ```python
   [1, 2, 'apple']
   ```

4. 元组类型

   元组类型与列表的作用相似，但这些元素`有顺序`、`可以重复`、但是`不可以被修改`

   python中一般使用小括号`()`创建元组，使用方法和列表一样。

5. 集合类型

   集合类型与列表、元组类似，但是这些元素`没有特定的顺序`，并且每个元素必须是`唯一`的。

   python中一般使用大括号`{}`创建集合。

6. 字典类型

   可以存储任意数量的元素，但是元素是“Key:Value”形式的键值对，键不能重复。

   python中一般使用大括号`{}`创建字典。

   ```python
   {"name": "张三", "age": 18}
   ```

### 2.6.3 变量的输入与输出

输入函数`input()`输出函数`print()`

```python
# print()的语法格式如下
print(*object, sep=' ', end='\n', file=None, flush=False)
```

- *object：表示输出的数据。输出多个数据时，数据需要用英文逗号分隔
- sep：可选参数，用于设定数据之间使用的分隔符，默认值为空格
- end：可选参数，用于设定输出结果以什么结尾，默认值为换行符\n
- file：可选参数，表示数据要写入的文件对象，默认值为sys.stdout(表示标准输出文件，默认情况下程序会将结果输出到控制台)
- flush：可选参数，表示是否刷新标准输出流，默认值为False(表示不刷新)

## 2.4 数字类型

### 2.4.1 整型

整型常用的记数方式有4种，分别时二进制、八进制、十进制和十六进制，默认的计数方式为十进制

二进制以"0B"或"0b"开头

八进制以"0o"或"0O"开头

十六进制以"0x"或"0X"开头

```python
5    # 十进制
0b101    # 二进制
0o5    # 八进制
0x5    # 十六进制
```

python中有用于转换数据进制的函数，分别时`bin()`、`oct()`、`int()`、`hex()`

| 函数   | 说明              |
| ------ | ----------------- |
| bin(x) | 将x转换为二进制   |
| oct(x) | 将x转换为八进制   |
| int(x) | 将x转换为十进制   |
| hex(x) | 将x转换为十六进制 |

```python
# 各函数的用法
num = 12
print(bin(num))    # 将十进制转换成为二进制
```

### 2.4.2 浮点型

浮点型用于表示实数，实数由整数部分、小数点和小数部分组成。

python可以直接使用小数点的形式表示浮点型数据。

当需要表示较大或较小的实数时，可以用科学计数法表示浮点型数据。

浮点型数据的取值范围为-1.8e308~1.8e308，若超出这个范围，python会将数据是为无穷大(inf)或无穷小(-inf)

```python
print(3.14e500)
# 结果为inf
```

### 2.4.3 复数类型

复数类型用于表示复数，复数的一般形式为'实部+虚部j'(对就是数学上面的复数)

可以通过`complex()`函数创建复数，该函数的使用方式为`complex(实部,虚部)`

```python
complex_one = complex(3, 2)
print(complex_one)
# 输出结果：(3+2j)
```

可以通过real和imag属性可以单独获取复数的实部和虚部

```python
one = 1 + 2j
print(one.real)    # 获取复数的实部
print(one.imag)    # 获取复数的虚部
```

### 2.4.4 布尔类型

布尔类型用于表示逻辑判断的真或假，真对应的取值为True，假对应的取值为False

python中对任何数据进行逻辑判断后都可以得到一个布尔值

布尔值为False的常见数据如下

- None;
- 任意值为0的数字类型的数据，如0、0.0、0j;
- 任何空的组合数据类型的数据，如空字符串、空元组、空列表、空集合、空字典。

None是一个特殊的空值，表示没有值。除了上述数据，其他数据的布尔值一般都是True

python中可以使用`bool()`函数检测数据的布尔值

### 2.4.5 数字类型转换

python中有可强制转换数据类型的函数，使用这些函数可以将目标数据转换为特定的类型

有转换数字类型的函数`int()`、`float()`、`complex()`

## 2.5 运算符

运算符分为算术运算符、赋值运算符、比较运算符、逻辑运算符、成员运算符和位运算符。

### 2.5.1 算术运算符

算术运算符主要用于执行基本的数学运算，比如加减乘除

| 运算符 | 功能说明                               |
| ------ | -------------------------------------- |
| +      | 加法运算符                             |
| -      | 减法运算符                             |
| *      | 乘法运算符                             |
| /      | 除法运算符(结果是浮点数类型)           |
| //     | 整除运算符(相除后的商，取商的整数部分) |
| %      | 取模运算符(相除后的余数)               |
| **     | 幂运算符                               |

1. 整型与浮点型进行混合运算时，将整型转化为浮点型。

2. 其他类型与复数类型进行运算时，将其他类型转换为复数类型。

### 2.5.2 赋值运算符

赋值运算符用于将右侧的值赋给左侧的变量。

| 运算符 | 功能说明 | 示例 |
| ------ | -------- | ---- |
| =      | 基本赋值 | `x = 5` |
| +=     | 加法赋值 | `x += 3` 相当于 `x = x + 3` |
| -=     | 减法赋值 | `x -= 3` 相当于 `x = x - 3` |
| *=     | 乘法赋值 | `x *= 3` 相当于 `x = x * 3` |
| /=     | 除法赋值 | `x /= 3` 相当于 `x = x / 3` |
| //=    | 整除赋值 | `x //= 3` 相当于 `x = x // 3` |
| %=     | 取模赋值 | `x %= 3` 相当于 `x = x % 3` |
| **=    | 幂赋值 | `x **= 3` 相当于 `x = x ** 3` |

### 2.5.3 比较运算符

比较运算符用于比较两个值，返回布尔值 True 或 False。

| 运算符 | 功能说明 | 示例 |
| ------ | -------- | ---- |
| ==     | 等于 | `5 == 5` 结果为 True |
| !=     | 不等于 | `5 != 3` 结果为 True |
| >      | 大于 | `5 > 3` 结果为 True |
| <      | 小于 | `5 < 3` 结果为 False |
| >=     | 大于或等于 | `5 >= 5` 结果为 True |
| <=     | 小于或等于 | `5 <= 3` 结果为 False |

```python
x, y = 5, 3
print(x == y)  # False
print(x > y)   # True
print(x != y)  # True
```

### 2.5.4 逻辑运算符

逻辑运算符用于连接多个条件表达式，返回布尔值。

| 运算符 | 功能说明 | 示例 |
| ------ | -------- | ---- |
| and    | 逻辑与，所有条件为 True 时结果为 True | `True and False` 结果为 False |
| or     | 逻辑或，任一条件为 True 时结果为 True | `True or False` 结果为 True |
| not    | 逻辑非，取反 | `not True` 结果为 False |

```python
a, b = 5, 10
print(a > 0 and b < 20)  # True
print(a > 10 or b < 20)  # True
print(not a > 10)        # True
```

### 2.5.5 成员运算符

成员运算符用于检测指定数据是否存在于序列（如字符串、列表、元组、集合、字典）中。

| 运算符 | 功能说明 | 示例 |
| ------ | -------- | ---- |
| in     | 如果指定数据在序列中返回 True，否则返回 False | `'p' in 'python'` 结果为 True |
| not in | 如果指定数据不在序列中返回 True，否则返回 False | `'x' not in 'python'` 结果为 True |

```python
x = 'python'
y = 'p'
print(y in x)      # 结果为 True
print(y not in x)  # 结果为 False

fruits = ['apple', 'banana', 'orange']
print('apple' in fruits)  # True
```

### 2.5.6 位运算符

位运算符用于对操作数的二进制位进行运算，操作数必须为`整数`。

python 中一共 6 个位运算符：`<<`、`>>`、`&`、`|`、`^`、`~`

| 运算符 | 功能说明 | 示例 |
| ------ | -------- | ---- |
| << | 操作数按位左移 | 5 << 1 (二进制：101 << 1 = 1010，结果为 10) |
| >> | 操作数按位右移 | 5 >> 1 (二进制：101 >> 1 = 10，结果为 2) |
| & | 左操作数与右操作数执行按位与运算 | 5 & 3 (二进制：101 & 011 = 001，结果为 1) |
| \| | 左操作数与右操作数执行按位或运算 | 5 \| 3 (二进制：101 \| 011 = 111，结果为 7) |
| ^ | 左操作数与右操作数执行按位异或运算 | 5 ^ 3 (二进制：101 ^ 011 = 110，结果为 6) |
| ~ | 操作数按位取反 | ~5 (结果为 -6) |

### 2.5.7 运算符优先级

python 支持使用多个不同的运算符连接简单表达式实现相对复杂的功能，为避免多个运算符的表达式出现歧义，python 为每种运算符都设定了优先级。

| 运算符 | 描述 |
| ------ | ---- |
| ** | 幂运算符 |
| ~、+、- | 按位取反、正号、负号 |
| *、/、%、// | 乘法运算符、除法运算符、取模运算符、整除运算符 |
| +、- | 加法运算符、减法运算符 |
| >>、<< | 按位右移运算符、按位左移运算符 |
| & | 按位与运算符 |
| ^、\| | 按位异或运算符、按位或运算符 |
| ==、!=、>=、>、<=、< | 比较运算符 |
| in、not in | 成员运算符 |
| not、and、or | 逻辑运算符 |
| +=、-=、*=、/=、//=、%=、**= | 复合赋值运算符 |
| = | 赋值运算符 |

| 运算符                       | 描述                                           |
| ---------------------------- | ---------------------------------------------- |
| **                           | 幂运算符                                       |
| *、/、%、//                  | 乘法运算符、除法运算符、取模运算符、整除运算符 |
| +、-                         | 加法运算符、减法运算符                         |
| >>、<<                       | 按位右移运算符、按位左移运算符                 |
| &                            | 按位与运算符                                   |
| ^、\|                        | 按位异或运算符、按位或运算符                   |
| ==、!=、>=、>、<=、<         | 比较运算符                                     |
| in、not in                   | 成员运算符                                     |
| not、and、or                 | 逻辑运算符                                     |
| +=、-=、*=、/=、//=、%=、**= | 复合赋值运算符                                 |
| =                            | 赋值运算符                                     |

# 3. 流程控制

流程控制用于控制程序的执行顺序，Python 中有三种基本的流程控制结构：顺序结构、选择结构（分支结构）和循环结构。

## 3.1 条件语句（if 语句）

### 3.1.1 if 语句的基本语法

```python
if 条件:
    # 条件为 True 时执行的代码
```

### 3.1.2 if-else 语句

```python
if 条件:
    # 条件为 True 时执行的代码
else:
    # 条件为 False 时执行的代码
```

### 3.1.3 if-elif-else 语句

```python
if 条件 1:
    # 条件 1 为 True 时执行的代码
elif 条件 2:
    # 条件 2 为 True 时执行的代码
elif 条件 3:
    # 条件 3 为 True 时执行的代码
else:
    # 所有条件都为 False 时执行的代码
```

### 3.1.4 if 语句嵌套

```python
if 条件 1:
    if 条件 2:
        # 条件 1 和条件 2 都为 True 时执行的代码
    else:
        # 条件 1 为 True，条件 2 为 False 时执行的代码
```

### 3.1.5 实例

```python
# 判断成绩等级
score = 85

if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
elif score >= 70:
    print("中等")
elif score >= 60:
    print("及格")
else:
    print("不及格")

# 判断闰年
year = 2024
if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
    print(f"{year} 是闰年")
else:
    print(f"{year} 不是闰年")
```

---

## 3.2 循环语句

### 3.2.1 while 循环

while 循环在条件为 True 时重复执行代码块。

```python
# 基本语法
while 条件:
    # 循环体
```

```python
# 示例：计算 1 到 100 的和
sum = 0
i = 1
while i <= 100:
    sum += i
    i += 1
print(f"1 到 100 的和为：{sum}")
```

### 3.2.2 for 循环

for 循环用于遍历序列（列表、元组、字符串等）或其他可迭代对象。

```python
# 基本语法
for 变量 in 序列:
    # 循环体
```

```python
# 遍历列表
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(fruit)

# 使用 range() 函数
for i in range(5):  # 0 到 4
    print(i)

for i in range(1, 6):  # 1 到 5
    print(i)

for i in range(1, 10, 2):  # 1, 3, 5, 7, 9
    print(i)
```

### 3.2.3 循环控制语句

**break 语句**：立即终止循环

```python
for i in range(10):
    if i == 5:
        break
    print(i)  # 输出 0 到 4
```

**continue 语句**：跳过当前迭代，继续下一次迭代

```python
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # 输出 1, 3, 5, 7, 9
```

**pass 语句**：空语句，占位符，什么也不做

```python
for i in range(10):
    if i == 5:
        pass  # 暂时不处理，后续补充
    print(i)
```

### 3.2.4 循环嵌套

```python
# 打印九九乘法表
for i in range(1, 10):
    for j in range(1, i + 1):
        print(f"{j}×{i}={i*j}", end="\t")
    print()
```

### 3.2.5 else 子句

循环语句可以有 else 子句，在循环正常结束（非 break 终止）时执行。

```python
for i in range(5):
    print(i)
else:
    print("循环正常结束")

# 带 break 的情况
for i in range(5):
    if i == 3:
        break
    print(i)
else:
    print("这行不会输出，因为循环被 break 终止")
```

---

# 4. 函数

函数是组织好的、可重复使用的、用来实现单一或相关联功能的代码段。

## 4.1 函数的定义

使用 `def` 关键字定义函数：

```python
def 函数名 (参数列表):
    """函数文档字符串"""
    # 函数体
    return 返回值
```

```python
# 示例：定义一个简单的函数
def greet(name):
    """向用户打招呼"""
    print(f"Hello, {name}!")

# 调用函数
greet("张三")  # 输出：Hello, 张三!
```

## 4.2 函数的参数

### 4.2.1 位置参数

```python
def describe_pet(animal_type, pet_name):
    print(f"I have a {animal_type}.")
    print(f"My {animal_type}'s name is {pet_name}.")

describe_pet("dog", "Harry")  # 位置参数
```

### 4.2.2 关键字参数

```python
describe_pet(pet_name="Harry", animal_type="dog")  # 关键字参数
```

### 4.2.3 默认参数

```python
def describe_pet(pet_name, animal_type="dog"):
    print(f"I have a {animal_type}.")
    print(f"My {animal_type}'s name is {pet_name}.")

describe_pet("Harry")  # 使用默认值
describe_pet("Harry", "cat")  # 覆盖默认值
```

### 4.2.4 可变参数

**不定长位置参数（*args）**

```python
def make_pizza(*toppings):
    """接收任意数量的配料"""
    print("Making a pizza with the following toppings:")
    for topping in toppings:
        print(f"- {topping}")

make_pizza("pepperoni")
make_pizza("mushrooms", "green peppers", "extra cheese")
```

**不定长关键字参数（**kwargs）**

```python
def build_profile(first, last, **user_info):
    """接收任意数量的关键字参数"""
    user_info["first_name"] = first
    user_info["last_name"] = last
    return user_info

user = build_profile("albert", "einstein", location="princeton", field="physics")
print(user)
```

## 4.3 函数的返回值

```python
# 返回简单值
def get_formatted_name(first_name, last_name):
    full_name = f"{first_name} {last_name}"
    return full_name

# 返回字典
def build_person(first_name, last_name, age=None):
    person = {"first": first_name, "last": last_name}
    if age:
        person["age"] = age
    return person

# 返回多个值
def calculate(a, b):
    return a + b, a - b, a * b, a / b

sum, diff, prod, quot = calculate(10, 5)
```

## 4.4 匿名函数（lambda 表达式）

lambda 表达式用于创建小型匿名函数。

```python
# 普通函数
def add(x, y):
    return x + y

# lambda 表达式
add = lambda x, y: x + y

# 示例
numbers = [1, 5, 2, 9, 3, 7]
numbers.sort(key=lambda x: -x)  # 降序排列
print(numbers)  # [9, 7, 5, 3, 2, 1]

# 与 map()、filter() 配合使用
squares = list(map(lambda x: x ** 2, [1, 2, 3, 4, 5]))
evens = list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4, 5, 6]))
```

## 4.5 变量的作用域

- **局部变量**：在函数内部定义的变量，只能在函数内部访问
- **全局变量**：在函数外部定义的变量，可以在整个模块中访问

```python
# 全局变量
global_var = "I am global"

def my_function():
    # 局部变量
    local_var = "I am local"
    print(global_var)  # 可以访问全局变量
    print(local_var)   # 可以访问局部变量

my_function()
print(global_var)  # 可以访问
# print(local_var)  # 错误！无法访问局部变量

# 使用 global 关键字修改全局变量
def modify_global():
    global global_var
    global_var = "Modified"

modify_global()
print(global_var)  # 输出：Modified
```

---

# 5. 数据结构

## 5.1 列表（List）

列表是最常用的 Python 数据结构，是可变的有序序列。

### 5.1.1 创建列表

```python
# 创建空列表
list1 = []
list2 = list()

# 创建包含元素的列表
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
```

### 5.1.2 访问列表元素

```python
fruits = ["apple", "banana", "orange", "grape"]

print(fruits[0])     # apple
print(fruits[-1])    # grape（负数索引表示从末尾开始）
print(fruits[1:3])   # ["banana", "orange"]（切片）
print(fruits[:2])    # ["apple", "banana"]
print(fruits[2:])    # ["orange", "grape"]
```

### 5.1.3 修改列表

```python
fruits = ["apple", "banana", "orange"]

# 修改元素
fruits[1] = "blueberry"

# 添加元素
fruits.append("grape")        # 末尾添加
fruits.insert(1, "mango")     # 指定位置插入

# 删除元素
fruits.remove("apple")        # 删除指定值
del fruits[0]                 # 删除指定位置
last = fruits.pop()           # 删除并返回末尾元素
first = fruits.pop(0)         # 删除并返回指定位置元素
```

### 5.1.4 列表操作

```python
list1 = [1, 2, 3]
list2 = [4, 5, 6]

# 列表拼接
list3 = list1 + list2  # [1, 2, 3, 4, 5, 6]

# 列表重复
list4 = list1 * 3  # [1, 2, 3, 1, 2, 3, 1, 2, 3]

# 列表长度
length = len(list1)  # 3

# 成员检查
print(2 in list1)  # True
```

### 5.1.5 列表方法

```python
fruits = ["apple", "banana", "orange"]

# 添加
fruits.append("grape")           # 末尾添加
fruits.extend(["mango", "pear"]) # 扩展列表
fruits.insert(0, "first")        # 插入

# 删除
fruits.remove("apple")           # 删除指定值
last = fruits.pop()              # 删除并返回末尾
fruits.clear()                   # 清空列表

# 查找
index = fruits.index("banana")   # 返回索引
count = fruits.count("apple")    # 计算出现次数

# 排序
fruits.sort()                    # 升序排序
fruits.sort(reverse=True)        # 降序排序
fruits.reverse()                 # 反转列表

# 其他
new_list = fruits.copy()         # 复制列表
```

### 5.1.6 列表推导式

```python
# 基本语法
squares = [x ** 2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 带条件
evens = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# 嵌套循环
pairs = [(x, y) for x in range(3) for y in range(3)]
# [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)]
```

## 5.2 元组（Tuple）

元组是不可变的有序序列。

### 5.2.1 创建元组

```python
# 创建空元组
tuple1 = ()
tuple2 = tuple()

# 创建元组
colors = ("red", "green", "blue")
numbers = 1, 2, 3, 4, 5  # 可以省略括号

# 单元素元组（需要逗号）
single = (1,)
```

### 5.2.2 访问元组元素

```python
colors = ("red", "green", "blue")
print(colors[0])      # red
print(colors[-1])     # blue
print(colors[1:])     # ("green", "blue")
```

### 5.2.3 元组解包

```python
point = (10, 20)
x, y = point
print(x)  # 10
print(y)  # 20

# 交换变量
a, b = 1, 2
a, b = b, a
print(a, b)  # 2, 1
```

## 5.3 字典（Dictionary）

字典是无序的键值对集合。

### 5.3.1 创建字典

```python
# 创建空字典
dict1 = {}
dict2 = dict()

# 创建字典
person = {"name": "张三", "age": 18, "city": "北京"}

# 使用 dict() 函数
person = dict(name="张三", age=18, city="北京")

# 使用键值对列表
person = dict([("name", "张三"), ("age", 18), ("city", "北京")])
```

### 5.3.2 访问字典元素

```python
person = {"name": "张三", "age": 18}

# 通过键访问
print(person["name"])  # 张三

# 使用 get() 方法（键不存在时返回 None 或默认值）
print(person.get("age"))  # 18
print(person.get("gender", "未知"))  # 未知
```

### 5.3.3 修改字典

```python
person = {"name": "张三", "age": 18}

# 添加或修改键值对
person["age"] = 19           # 修改
person["gender"] = "男"      # 添加

# 删除
del person["name"]           # 删除指定键
age = person.pop("age")      # 删除并返回值
last = person.popitem()      # 删除并返回最后一对

# 清空
person.clear()
```

### 5.3.4 字典方法

```python
person = {"name": "张三", "age": 18, "city": "北京"}

# 获取所有键
keys = person.keys()

# 获取所有值
values = person.values()

# 获取所有键值对
items = person.items()

# 更新字典
person.update({"age": 19, "gender": "男"})

# 复制字典
new_person = person.copy()

# 设置默认值
person.setdefault("gender", "未知")
```

### 5.3.5 遍历字典

```python
person = {"name": "张三", "age": 18, "city": "北京"}

# 遍历键
for key in person.keys():
    print(key)

# 遍历值
for value in person.values():
    print(value)

# 遍历键值对
for key, value in person.items():
    print(f"{key}: {value}")
```

### 5.3.6 字典推导式

```python
# 创建平方字典
squares = {x: x ** 2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# 带条件
even_squares = {x: x ** 2 for x in range(10) if x % 2 == 0}
# {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}
```

## 5.4 集合（Set）

集合是无序的不重复元素集。

### 5.4.1 创建集合

```python
# 创建空集合（注意：{} 创建的是空字典）
set1 = set()

# 创建集合
fruits = {"apple", "banana", "orange"}
numbers = set([1, 2, 3, 4, 5])
```

### 5.4.2 集合操作

```python
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

# 并集
union = set1 | set2  # {1, 2, 3, 4, 5, 6, 7, 8}

# 交集
intersection = set1 & set2  # {4, 5}

# 差集
difference = set1 - set2  # {1, 2, 3}

# 对称差集
symmetric_difference = set1 ^ set2  # {1, 2, 3, 6, 7, 8}
```

### 5.4.3 集合方法

```python
fruits = {"apple", "banana", "orange"}

# 添加
fruits.add("grape")           # 添加元素
fruits.update(["mango", "pear"])  # 添加多个元素

# 删除
fruits.remove("apple")        # 删除元素（不存在会报错）
fruits.discard("banana")      # 删除元素（不存在不报错）
last = fruits.pop()           # 随机删除并返回元素

# 清空
fruits.clear()
```

---

# 6. 面向对象编程

## 6.1 类和对象

类是对象的模板，对象是类的实例。

```python
class Dog:
    """定义一个狗类"""
    
    def __init__(self, name, age):
        """初始化属性"""
        self.name = name
        self.age = age
    
    def sit(self):
        """模拟狗坐下"""
        print(f"{self.name} is now sitting.")
    
    def roll_over(self):
        """模拟狗打滚"""
        print(f"{self.name} rolled over!")

# 创建对象
my_dog = Dog("Harry", 3)

# 访问属性
print(my_dog.name)  # Harry
print(my_dog.age)   # 3

# 调用方法
my_dog.sit()         # Harry is now sitting.
my_dog.roll_over()   # Harry rolled over!
```

## 6.2 继承

子类继承父类的属性和方法。

```python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        print("动物在叫")

class Cat(Animal):
    def __init__(self, name, color):
        super().__init__(name)  # 调用父类初始化方法
        self.color = color
    
    def speak(self):  # 重写父类方法
        print(f"{self.name} 在喵喵叫")

cat = Cat("咪咪", "白色")
cat.speak()  # 咪咪在喵喵叫
```

## 6.3 封装

使用私有属性（双下划线开头）实现封装。

```python
class BankAccount:
    def __init__(self, balance=0):
        self.__balance = balance  # 私有属性
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
    
    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
    
    def get_balance(self):
        return self.__balance

account = BankAccount(1000)
account.deposit(500)
account.withdraw(200)
print(account.get_balance())  # 1300
```

## 6.4 多态

不同类的对象对同一消息做出不同的响应。

```python
class Dog:
    def speak(self):
        return "汪汪汪"

class Cat:
    def speak(self):
        return "喵喵喵"

def animal_speak(animal):
    print(animal.speak())

dog = Dog()
cat = Cat()

animal_speak(dog)  # 汪汪汪
animal_speak(cat)  # 喵喵喵
```

---

# 7. 异常处理

## 7.1 try-except 语句

```python
try:
    # 可能引发异常的代码
    result = 10 / 0
except ZeroDivisionError:
    # 处理特定异常
    print("除数不能为零")
except Exception as e:
    # 处理其他异常
    print(f"发生错误：{e}")
else:
    # 没有异常时执行
    print(f"结果是：{result}")
finally:
    # 无论是否异常都执行
    print("程序执行完毕")
```

## 7.2 常见异常类型

| 异常类型 | 说明 |
| -------- | ---- |
| NameError | 使用了未声明的变量 |
| TypeError | 类型错误 |
| ValueError | 值错误 |
| IndexError | 索引超出范围 |
| KeyError | 字典中不存在该键 |
| FileNotFoundError | 文件不存在 |
| ZeroDivisionError | 除数为零 |
| AttributeError | 访问不存在的属性 |

## 7.3 抛出异常

```python
def set_age(age):
    if age < 0 or age > 150:
        raise ValueError("年龄必须在 0 到 150 之间")
    return age

try:
    set_age(-5)
except ValueError as e:
    print(e)
```

---

# 8. 文件操作

## 8.1 打开和关闭文件

```python
# 方法一：手动关闭
file = open("test.txt", "r", encoding="utf-8")
content = file.read()
file.close()

# 方法二：使用 with 语句（推荐）
with open("test.txt", "r", encoding="utf-8") as file:
    content = file.read()
```

## 8.2 文件打开模式

| 模式 | 说明 |
| ---- | ---- |
| r | 只读模式（默认） |
| w | 写入模式（覆盖原文件） |
| a | 追加模式 |
| r+ | 读写模式 |
| b | 二进制模式（与其他模式组合使用） |
| t | 文本模式（默认，与其他模式组合使用） |

## 8.3 读取文件

```python
with open("test.txt", "r", encoding="utf-8") as file:
    # 读取整个文件
    content = file.read()
    
    # 读取指定字节数
    content = file.read(10)
    
    # 读取一行
    line = file.readline()
    
    # 读取所有行
    lines = file.readlines()
    
    # 逐行读取
    for line in file:
        print(line.strip())
```

## 8.4 写入文件

```python
# 写入文件（覆盖模式）
with open("test.txt", "w", encoding="utf-8") as file:
    file.write("Hello, World!\n")
    file.write("第二行内容\n")

# 追加写入
with open("test.txt", "a", encoding="utf-8") as file:
    file.write("追加的内容\n")
```

## 8.5 文件指针操作

```python
with open("test.txt", "r", encoding="utf-8") as file:
    # 获取当前指针位置
    position = file.tell()
    
    # 移动指针
    file.seek(0)      # 移动到文件开头
    file.seek(10)     # 移动到第 10 个字节
    file.seek(0, 2)   # 移动到文件末尾
```

---

# 9. 常用标准库

## 9.1 os 模块

```python
import os

# 获取当前工作目录
cwd = os.getcwd()

# 切换目录
os.chdir("/path/to/dir")

# 创建目录
os.mkdir("new_folder")
os.makedirs("a/b/c")  # 创建多级目录

# 删除目录
os.rmdir("new_folder")
os.removedirs("a/b/c")

# 删除文件
os.remove("file.txt")

# 列出目录内容
files = os.listdir(".")

# 判断路径
os.path.exists("file.txt")      # 是否存在
os.path.isfile("file.txt")      # 是否为文件
os.path.isdir("folder")         # 是否为目录

# 路径操作
os.path.join("folder", "file.txt")  # 拼接路径
os.path.split("folder/file.txt")    # 分割路径
```

## 9.2 sys 模块

```python
import sys

# 命令行参数
args = sys.argv

# 退出程序
sys.exit(0)

# Python 版本
print(sys.version)

# 模块搜索路径
print(sys.path)
```

## 9.3 datetime 模块

```python
from datetime import datetime, date, timedelta

# 当前日期和时间
now = datetime.now()

# 指定日期和时间
dt = datetime(2024, 1, 1, 12, 0, 0)

# 格式化
formatted = dt.strftime("%Y-%m-%d %H:%M:%S")

# 解析
parsed = datetime.strptime("2024-01-01", "%Y-%m-%d")

# 日期计算
tomorrow = date.today() + timedelta(days=1)
```

## 9.4 json 模块

```python
import json

# Python 对象转 JSON 字符串
data = {"name": "张三", "age": 18}
json_str = json.dumps(data, ensure_ascii=False)

# JSON 字符串转 Python 对象
data = json.loads(json_str)

# 写入 JSON 文件
with open("data.json", "w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False)

# 读取 JSON 文件
with open("data.json", "r", encoding="utf-8") as file:
    data = json.load(file)
```

## 9.5 random 模块

```python
import random

# 随机整数
num = random.randint(1, 10)

# 随机浮点数
num = random.random()      # 0.0 到 1.0
num = random.uniform(1, 10) # 1 到 10

# 随机选择
item = random.choice([1, 2, 3, 4, 5])

# 随机打乱
items = [1, 2, 3, 4, 5]
random.shuffle(items)

# 随机抽样
sample = random.sample([1, 2, 3, 4, 5], 3)
```

## 9.6 re 模块（正则表达式）

```python
import re

# 匹配
match = re.match(r"\d+", "123abc")
if match:
    print(match.group())  # 123

# 搜索
match = re.search(r"\d+", "abc123def")
if match:
    print(match.group())  # 123

# 查找所有
matches = re.findall(r"\d+", "a1b2c3d4")
print(matches)  # ['1', '2', '3', '4']

# 替换
result = re.sub(r"\d+", "X", "a1b2c3")
print(result)  # aXbXcX

# 分割
result = re.split(r"\d+", "a1b2c3")
print(result)  # ['a', 'b', 'c', '']
```

---

# 10. Python 最佳实践

## 10.1 PEP 8 编码规范

1. 使用 4 个空格缩进
2. 每行代码不超过 79 个字符
3. 使用空行分隔函数和类
4. 导入语句放在文件开头
5. 使用有意义的变量名和函数名
6. 添加适当的注释和文档字符串

## 10.2 代码优化建议

1. 使用列表推导式代替循环
2. 使用生成器表达式处理大数据
3. 使用内置函数和标准库
4. 避免重复计算
5. 使用缓存装饰器

## 10.3 调试技巧

1. 使用 print() 输出调试信息
2. 使用 logging 模块记录日志
3. 使用断点调试（pdb 模块）
4. 使用 IDE 的调试功能

---

# 11. 实战示例

## 11.1 计算器

```python
def calculator():
    print("简单计算器")
    print("1. 加法")
    print("2. 减法")
    print("3. 乘法")
    print("4. 除法")
    
    choice = input("请选择操作 (1/2/3/4): ")
    
    if choice in ["1", "2", "3", "4"]:
        num1 = float(input("输入第一个数字："))
        num2 = float(input("输入第二个数字："))
        
        if choice == "1":
            result = num1 + num2
            print(f"{num1} + {num2} = {result}")
        elif choice == "2":
            result = num1 - num2
            print(f"{num1} - {num2} = {result}")
        elif choice == "3":
            result = num1 * num2
            print(f"{num1} × {num2} = {result}")
        elif choice == "4":
            if num2 != 0:
                result = num1 / num2
                print(f"{num1} ÷ {num2} = {result}")
            else:
                print("除数不能为零")
    else:
        print("无效输入")

calculator()
```

## 11.2 待办事项管理

```python
class TodoList:
    def __init__(self):
        self.tasks = []
    
    def add_task(self, task):
        self.tasks.append({"task": task, "completed": False})
        print(f"已添加任务：{task}")
    
    def complete_task(self, index):
        if 0 <= index < len(self.tasks):
            self.tasks[index]["completed"] = True
            print(f"任务已完成：{self.tasks[index]['task']}")
        else:
            print("无效的任务编号")
    
    def show_tasks(self):
        if not self.tasks:
            print("暂无任务")
            return
        
        for i, task in enumerate(self.tasks):
            status = "✓" if task["completed"] else "✗"
            print(f"{i}. [{status}] {task['task']}")
    
    def remove_task(self, index):
        if 0 <= index < len(self.tasks):
            removed = self.tasks.pop(index)
            print(f"已删除任务：{removed['task']}")
        else:
            print("无效的任务编号")

# 使用示例
todo = TodoList()
todo.add_task("学习 Python")
todo.add_task("完成项目")
todo.show_tasks()
todo.complete_task(0)
todo.show_tasks()
```

---

# 11. 重要进阶主题

## 11.1 装饰器（Decorator）

装饰器是一种高阶函数，可以在不修改原函数代码的情况下为其添加额外功能。

```python
# 基础装饰器
def timer(func):
    """计算函数执行时间"""
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} 执行耗时: {end - start:.4f}秒")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)
    print("函数执行完毕")

slow_function()  # 会打印执行时间

# 带参数的装饰器
def repeat(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print("Hello!")

say_hello()  # 打印 3 次
```

## 11.2 生成器（Generator）与迭代器（Iterator）

生成器使用 `yield` 关键字，可以逐个产生值，节省内存。

```python
# 生成器函数
def count_down(n):
    while n > 0:
        yield n
        n -= 1

for num in count_down(5):
    print(num)  # 5, 4, 3, 2, 1

# 生成器表达式（类似列表推导式但节省内存）
squares = (x ** 2 for x in range(10))
print(list(squares))  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 斐波那契数列生成器
def fibonacci(limit):
    a, b = 0, 1
    while a < limit:
        yield a
        a, b = b, a + b

for n in fibonacci(100):
    print(n, end=" ")  # 0 1 1 2 3 5 8 13 21 34 55 89
```

## 11.3 类型提示（Type Hints）

Python 3.5+ 支持类型注解，提高代码可读性和可维护性。

```python
from typing import List, Dict, Optional, Tuple

# 函数参数和返回值类型注解
def greet(name: str, age: int = 18) -> str:
    return f"{name} 今年 {age} 岁"

# 复杂类型
def process_data(items: List[int]) -> Dict[str, int]:
    return {"sum": sum(items), "count": len(items)}

# 可选类型
def find_user(user_id: int) -> Optional[str]:
    users = {1: "张三", 2: "李四"}
    return users.get(user_id)  # 可能返回 None

# 类型别名
Vector = List[float]

def scale_vector(v: Vector, factor: float) -> Vector:
    return [x * factor for x in v]
```

## 11.4 异步编程（async/await）

Python 3.5+ 支持 `async`/`await` 异步编程，适合 I/O 密集型任务。

```python
import asyncio

# 定义异步函数
async def fetch_data(url: str, delay: int):
    print(f"开始请求: {url}")
    await asyncio.sleep(delay)  # 模拟网络请求
    print(f"完成请求: {url}")
    return f"数据来自 {url}"

# 并发执行多个异步任务
async def main():
    tasks = [
        fetch_data("https://api.example.com/user", 2),
        fetch_data("https://api.example.com/posts", 3),
        fetch_data("https://api.example.com/comments", 1),
    ]
    results = await asyncio.gather(*tasks)
    for r in results:
        print(r)

# 运行
# asyncio.run(main())

# 异步上下文管理器
class AsyncResource:
    async def __aenter__(self):
        print("打开资源")
        return self
    
    async def __aexit__(self, *args):
        print("关闭资源")
    
    async def work(self):
        await asyncio.sleep(1)
        print("工作完成")

async def use_resource():
    async with AsyncResource() as res:
        await res.work()
```

## 11.5 上下文管理器（with 语句）

上下文管理器用于资源的获取和释放，最常用于文件操作。

```python
# 自定义上下文管理器 - 类方式
class FileManager:
    def __enter__(self):
        print("打开文件")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("关闭文件")
        return False  # 返回 False 则传播异常
    
    def read(self):
        return "文件内容"

with FileManager() as fm:
    print(fm.read())

# 自定义上下文管理器 - contextlib 方式
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.time()
    yield
    end = time.time()
    print(f"耗时: {end - start:.2f}秒")

with timer():
    sum(range(1000000))
```

---

# 总结

Python 是一门功能强大且易于学习的编程语言，适合初学者和专业开发者。本文档涵盖了：

1. Python 基础语法和数据类型
2. 流程控制（条件语句和循环）
3. 函数的定义和使用
4. 数据结构（列表、元组、字典、集合）
5. 面向对象编程
6. 异常处理
7. 文件操作
8. 常用标准库
9. 最佳实践和实战示例
10. **进阶主题（装饰器、生成器、类型提示、异步编程、上下文管理器）**

掌握这些知识后，您可以开始编写自己的 Python 程序，并进一步学习更高级的主题，如 Web 开发、数据分析、机器学习等。
