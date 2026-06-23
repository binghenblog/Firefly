---
title: CSS知识点
published: 2025-01-14 20:00:00
category: Web前端开发
tags: [Web, html, CSS]
---

# CSS简介

### CSS概念

CSS(Cascading Style Sheets)层叠样式表，又叫级联样式表，简称样式表。

CSS文件后缀名为`.css`

CSS用于HTML文档中元素样式的定义

使用CSS的唯一目的是让网页具有美观一致的页面

### 语法

CSS规则是由两个主要的部分构成：选择器，以及一条或多条声明。

选择器通常是需要改变样式的HTML元素

每条声明由一个属性和一个值组成

属性(property)是你希望设置的样式属性(style attribute)。每个属性有一个值。属性和值被冒号分开

```html
<style>    <!--在html文件中直接用样式(在head标签里面写)-->
    h1 {    <!--h1是选择器-->
        color: blue;    <!--color是属性，blue是值，整体为声明-->
        font-size: 12px;
    }
</style>
```

# CSS引入方式

### 内联样式(行内样式)

要使用内联样式，需要在相关标签内使用样式`<style>`属性。

Style属性可以包含任何CSS属性。

> [!NOTE] 提示
>
> 缺乏整体性和规划性，不利于维护，维护成本高。

```html
<p style="background: orange; font-size: 24px;">CSS</p>
```

### 内部样式

当单个文档需要特殊的样式时，就应该使用内部样式表。

可以使用`<style>`标签在文档头部定义内部样式表

> [!NOTE] 提示
>
> 单个页面内的CSS代码具有统一性和规划性，便于维护，但是在多个页面之间容易混乱。

```html
<head>
    <style>
        h1 {
            background: red;
        }
    </style>
</head>
```

### 外部样式(推荐)

当样式需要应用于很多页面时，外部样式表将是理想的选择。

在使用外部样式表的情况下，可以通过改变一个文件来改变整个站点的外观。

每个页面使用`<link>`标签链到样式表。`<link>`标签在(文档的)头部`<head>`

```html
<link rel="stylesheet" type="text/css" href="xxx.css">
```

# 选择器

CSS语法 规则由两个主要的部分构成：选择器，以及一条或多条声明(样式)

### 全局选择器

可以与任意元素匹配，**优先级最低**，一般做样式初始化。

```css
* {
    margin: 0;
    padding: 0;
}
```

### 元素选择器

HTML文档中的元素，`p、b、div、a、img、body`等。

标签选择器，选择的是页面上所有这种类型的标签，所以经常描述“共性”，无法描述某一个元素的“个性”

```css
p {
    font-size: 14px;
}
```

再比如说，我想让“学完前端，继续学习java”这句话中的“前端”两个字变为红色字体，那么可以用`<span>`标签把“前端”两个字围起来，然后给`<span>`标签加一个标签选择器。

```html
span {
	color: red;
}
<p>学完了<span>前端</span>，继续学java</p>
```

> [!NOTE] 温馨提示
>
> 1. 所有的标签，都可以是选择器.比如ul、li、label、dt、dl、input、div等。
> 2. 无论这个标签藏的多深，一定能够被选择上。
> 3. 选择的所有，而不是一个。

### 类选择器

规定用圆点`.`来定义，针对想要的所有标签使用

优点：灵活

```html
.one {
	width: 800px;
}
<h2 class="one">你好</h2>
```

> [!NOTE] class属性的特点
>
> 1. 类选择器可以被多种标签使用。
> 2. 类名不能以数字开头。
> 3. 同一个标签可以使用多个类选择器，用空格隔开。

```html
<h3 class="classone  classtwo">一个h3标签</h3> 
```

```html
<h3 class="teshu" class="zhongyao">一个h3标签</h3>  <!--错误的-->
```

### ID选择器

针对某一个特定的标签来使用，只能使用一次。

`CSS`中的ID选择器以`#`来定义

```html
#two {
	color: red;
} 
<h2 id="mytitle">你好</h2>
```

> [!NOTE] 特别强调
>
> 1. ID是唯一的(不能重复使用)
> 2. ID不能以数字开头

### 合并选择器

语法：`选择器1,选择器2,...{}`

作用：提取共同的样式，减少重复代码

```css
.header, .footer{
    height: 300px;
}
```

### 选择器的优先级

CSS中，权重用数字衡量

元素选择器的权重为：1

类选择器(class)的权重为：10

id选择器的权重为：100

内联样式的权重为：1000

优先级从高到低：行内样式 > ID选择器 > 类选择器 > 元素选择器

# 字体属性

CSS字体属性定义字体，颜色、大小、加粗、字体样式

### color

规定文本的颜色

```css
div{color: red;}
div{color: #ff0000;}	/*推荐*/
div{color: rgb(255,0,0);}
div{color: rgba(255,0,0,5);}	/*a是透明度*/
```

### font-size

设置文本的大小

能否管理文字的大小，网页设计中是非常重要的。但是，你不能通过调整字体大小使段落看上去像标题，或者使标题看上去像段落。

```css
h1 {font-size: 40px;}
h2 {font-size: 30px;}
p {font-size: 14px;}
```

> [!NOTE] 温馨提示
>
> chrome浏览器接受最小字体是12px

### font-weight

设置文本的粗细

| 值      | 说明                                      |
| ------- | ----------------------------------------- |
| bold    | 定义粗体字符                              |
| bolder  | 定义更粗的字符                            |
| lighter | 定义更细的字符                            |
| 100~900 | 定义由细到粗 400等同默认，而700等同于bold |

```css
h1 {font-weight: normal;}
div {font-weight: bold;}
p {font-weight: 900;}
```

### font-style

指定文本的字体样式

提示：每个值用逗号分开，如果字体名称包含空格，它必须加上引号

```css
p {font-family:"Microsoft YaHei";}	/*微软雅黑*/
```

# 背景属性

CSS背景属性主要由以下几个

| 属性                | 描述                 |
| ------------------- | -------------------- |
| background-color    | 设置背景颜色         |
| background-image    | 设置背景图片         |
| background-position | 设置背景图片显示位置 |
| background-repeat   | 设置背景图片如何填充 |
| background-size     | 设置背景图片大小属性 |

### background-color属性

该属性设置背景颜色

```css
<div class="box"></div>
.box {
	width: 300px;
	height: 300px;
	background-color: red;
}
```

### background-image属性

设置元素的背景图像

元素的背景是元素的总大小，包括填充和边界(不包括外边距)。默认情况下background-image属性放置在元素的左上角，如果图像不够大的话会在垂直和水平方向平铺图像，如果图像大小超过元素大小从图像的左上角显示元素大小的那部分。

```css
<div class="box"></div>
.box {
    width: 600px;
    height: 600px;
    background-image: url("1.png")
}
```

### background-repeat属性

该属性设置如何平铺背景图像

| 值        | 说明             |
| --------- | ---------------- |
| repeat    | 默认值           |
| repeat-x  | 只向水平方向平铺 |
| repeat-y  | 只向垂直方向平铺 |
| no-repeat | 不平铺           |

```css
.box {
    width: 600px;
    height: 600px;
    background-color: #fcc;
    background-image: url("img/1.png")
    background-repeat: no-repeat;
}
```

### background-size属性

该属性设置背景图像的大小

| 值         | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| length     | 设置背景图片的宽度和高度，第一个值宽度，第二个值高度，如果只是设置一个，则第二个auto |
| percentage | 计算相对位置区域的百分比，第一个值宽度，第二个值高度，如果只是设置一个，则第二个值auto |
| cover      | 保持图片横纵比并将图片缩放成完全覆盖背景区域的最大大小       |
| contain    | 保持图片横纵比并将图像缩放成适合背景定位区域的最大大小       |

```css
.box {
    width: 600px;
    height: 600px;
    background-image: url("img/1.png")
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
```

### background-position属性

该属性设置背景图像的起始位置，默认值是：0% 0%

| 值            | 说明                                                         |
| ------------- | ------------------------------------------------------------ |
| left top      | 左上角                                                       |
| left center   | 左中                                                         |
| left bottom   | 左下                                                         |
| right top     | 右上角                                                       |
| right center  | 右中                                                         |
| right bottom  | 右下                                                         |
| center top    | 中上                                                         |
| center center | 中中                                                         |
| center bottom | 中下                                                         |
| x% y%         | 第一个值是水平位置，第二个值是垂直位置，左上角是0% 0%，右下角是100% 100% 。如果只指定了一个值，其他值默认是50%，默认是0% 0% |

# 文本属性

### text-align属性

指定元素文本的水平对齐方式

| 值     | 描述               |
| ------ | ------------------ |
| left   | 文本居左排列(默认) |
| right  | 文本居右排列       |
| center | 文本居中排列       |

```css
h1{text-align:center;}
```

### text-decoration属性

规定添加到文本的修饰，下划线、上划线、删除线等

| 值           | 描述       |
| ------------ | ---------- |
| underline    | 定义下划线 |
| overline     | 定义上划线 |
| line-through | 定义删除线 |

```css
h1{text-decoration: overline;}
```

### text-transform属性

控制文本的大小写

| 值         | 描述                 |
| ---------- | -------------------- |
| capitalize | 定义每个单词开头大写 |
| uppercase  | 定义全部大写字母     |
| lowercase  | 定义全部小写字母     |

```css
p {text-transform: capitalize;}
```

### text-indent属性

规定文本块中首行文本的缩进

```css
p {text-indent: 50px;}
```

提示：负值时允许的。如果值时负数，将第一行左缩进。

# 表格属性

使用CSS可以使HTML表格更美观

### 表格边框

指定CSS表格边框，使用border属性

```css
table, td {
    border: 1px solid black;
}		/*边框大小、边框线样式(solid实线)、颜色*/
```

### 折叠边框

border-collapse属性设置边框是否被折叠成一个单一的边框或隔开

```css
table {border-collapse: collapse;}
table, td {border: 1px solid black;}
```

### 表格宽度和高度

width和height属性定义表格的宽度和高度

```css
table {width:100%;}
td {height: 50px;}
```

### 表格文字对齐

表格中的文本对齐和垂直对齐属性

text-align属性设置水平对齐方式，向左、右、中心

```css
td{text-align: right;}
```

垂直对齐属性设置垂直对齐

```css
td{height:50px; vertical-align: bottom;}
```

### 表格填充

如果在表的内容中控制空格之间的边框，应使用td和th元素的填充属性

```css
td {padding:15px;}
```

### 表格颜色

下面例子指定边框的颜色，和th元素的文本和背景颜色

```css
table, td, th {border:1px solid green;}
td {background-color:green; color:white;}
```

# 关系选择器

### 关系选择器分类

1. 后代选择器
2. 子代选择器
3. 相邻兄弟选择器
4. 通用兄弟选择器

### 后代选择器

#### 定义

选择所有被A元素包含的B元素，中间用空格隔开

#### 语法

```css
A B{}
```

#### 例子

```html
<ul>
    <li>宝马</li>
    <li>奔驰</li>
</ul>
<ol>
    <li>奥迪</li>
</ol>
```

```css
ul li{
    color:green;
}
```

### 子代选择器

#### 定义

选择所有作为A元素的直接子元素B，对更深一层的元素不起作用，用>表示

#### 语法

```css
A>B{}
```

#### 例子

```html
<div>
    <a href="#">子元素1</a>
    <p> <a href="#">孙元素</a> </p>
    <a href="#">子元素2</a>
</div>
```

```css
div>a{
    color:red;
}
```

### 相邻兄弟选择器

#### 定义

选择紧跟A元素后的C元素，用加号(+)表示，选择相邻的第一个兄弟元素(向下选择)

#### 语法

```css
A+C{}
```

#### 例子

```html
<h1>h1元素</h1>
<p>第一个元素</p>
<p>第二个元素</p>
```

```css
h1+p {
    color:red;
}
```

### 通用兄弟选择器

#### 定义

选择A元素之后的所有兄弟元素B，作用于多个元素，用~隔开

#### 语法

```css
A~B {}
```

#### 例子

```html
<h1>h1元素</h1>
<p>元素1</p>
<p>元素2</p>
```

```css
h1~p {
    color:red;
}
```

# CSS盒子模型

### 概念

所有的HTML元素可以看作盒子，在CSS中，“box model”这一术语使用来**设计和布局时使用**(`<div>`)

CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：

1. Margin(外边距)-清除边框外的区域，外边距时透明的(两个值：第一个为上下，第二个为左右)
2. Border(边框)-围绕在内边距和内容外的边框(边框粗细、实线或虚线、线颜色)
3. Padding(内边距)-清除内容周围的区域，内边距是透明的(两个值：第一个为上下，第二个为左右)
4. Content(内容)-盒子的内容，显示文本和图像

例子：如果把盒子模型看作是一个生活中的快递，那么内容部分=你买的物品，内边距=快递盒子中的泡沫，边距=快递盒子，外边距=两个快递盒子之间的距离。

```css
div{
    padding-left: 50px;/*左内边距*/
    padding-right: 100px;/*右内边距*/
    padding-top: 150px;/*上内边距*/
    padding-bottom: 20px;/*下内边距*/
    border: 2px solid red;/*边框粗细、实线、线颜色*/
    margin: 10px;/*外边距*/
}
```

# 弹性盒子模型(flex box)

### 定义

弹性盒子是CSS3的一种新的布局模式

CSS3弹性盒是一种当页面需要适应不同的屏幕大小以及设备类型时确保元素拥有元素恰当的行为的布局方式

引入弹性盒布局模型的目的是提供一种更加有效的方式来对一个容器中的子元素进行排列、对齐和分配空白空间

### CSS3弹性盒内容

弹性盒子由弹性容器(Flex container)和弹性子元素(Flex item)组成

弹性容器通过设置`<display>`属性的值为`<flex>`将其定义为弹性容器

弹性容器内包含了一个或多个弹性子元素

提示：弹性容器外及弹性子元素内是正常渲染的。弹性盒子只定义了弹性子元素如何在弹性容器内布局

```html
<style>
    .flex-container {
        display: flex;/*定义盒子为弹性盒子*/
        width: 400px;
        height: 200px;
        background-color: lightgrey;
    }
    .box {
        width: 100px;
        height: 100px;
        margin: 10px;
        background-color: cornflowerblue;
    }
</style>
<div class="flex-container">
    <div class="flex-item">flex item 1</div>
    <div class="flex-item">flex item 2</div>
    <div class="flex-item">flex item 3</div>
</div>
```

提示：默认弹性盒里的内容是横向摆放

### 父元素上的属性

#### display属性

`<display:flex;>`开启弹性盒

`display:flex;`属性设置后子元素默认水平排列

#### flex-direction属性

##### 定义

flex-direction属性指定了单行子元素在父容器中的位置

##### 语法

```css
flex-direction: row | row-reverse | column | column-reverse
```

1. row：横向从左到右排列(左对齐)，(默认)
2. row-reverse：反转横向排列(右对齐，从后往前排，最后一项在最前面)
3. column：纵向排列
4. column-reverse：反转纵向排列，从后往前排，最后一项在最上面

```css
.flex-container {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 250px;
    background-color: lightgrey;
}
```

#### justify-content 属性

`justify-content` 属性定义弹性项目在主轴上的对齐方式。

```css
.flex-container {
    display: flex;
    justify-content: flex-start;     /* 默认：左对齐 */
    justify-content: flex-end;       /* 右对齐 */
    justify-content: center;         /* 居中对齐 */
    justify-content: space-between;  /* 两端对齐 */
    justify-content: space-around;   /* 环绕对齐 */
    justify-content: space-evenly;   /* 均匀分布 */
}
```

> 📌 Flexbox 完整指南见本章末尾 [Flexbox 完整指南](#flexbox-完整指南) 部分。

# 伪类选择器

伪类用于选择元素的特定状态或位置。

## 常见伪类

### 动态伪类

```css
/* 未访问的链接 */
a:link {
    color: blue;
}

/* 已访问的链接 */
a:visited {
    color: purple;
}

/* 鼠标悬停 */
a:hover {
    color: red;
    text-decoration: underline;
}

/* 元素获得焦点 */
input:focus {
    border-color: blue;
    outline: none;
}

/* 元素被激活（点击时） */
a:active {
    color: orange;
}
```

### 结构伪类

```css
/* 第一个子元素 */
p:first-child {
    font-weight: bold;
}

/* 最后一个子元素 */
p:last-child {
    color: gray;
}

/* 第 n 个子元素 */
li:nth-child(2) {
    background: yellow;
}

/* 奇数行 */
tr:nth-child(odd) {
    background: #f2f2f2;
}

/* 偶数行 */
tr:nth-child(even) {
    background: #ffffff;
}

/* 唯一子元素 */
p:only-child {
    color: blue;
}

/* 第一个元素 */
p:first-of-type {
    font-size: 18px;
}

/* 最后一个元素 */
p:last-of-type {
    font-style: italic;
}
```

### 表单伪类

```css
/* 启用状态 */
input:enabled {
    background: white;
}

/* 禁用状态 */
input:disabled {
    background: gray;
    cursor: not-allowed;
}

/* 选中状态（复选框、单选框） */
input:checked {
    accent-color: blue;
}

/* 验证失败 */
input:invalid {
    border-color: red;
}

/* 验证成功 */
input:valid {
    border-color: green;
}

/* 必填字段 */
input:required {
    border-left: 3px solid red;
}

/* 可选字段 */
input:optional {
    border-left: 3px solid gray;
}

/* 只读字段 */
input:read-only {
    background: #f0f0f0;
}
```

### 否定伪类

```css
/* 不是 p 元素的元素 */
:not(p) {
    color: blue;
}

/* 不是第一个的 li */
li:not(:first-child) {
    margin-top: 10px;
}
```

---

# 伪元素选择器

伪元素用于选择元素的特定部分并添加样式。

```css
/* 元素内容之前 */
p::before {
    content: "📌 ";
    color: red;
}

/* 元素内容之后 */
p::after {
    content: " ✨";
    color: blue;
}

/* 选中元素的首字母 */
p::first-letter {
    font-size: 24px;
    font-weight: bold;
    color: red;
}

/* 选中元素的第一行 */
p::first-line {
    font-weight: bold;
    font-size: 16px;
}

/* 文本选中状态 */
::selection {
    background: yellow;
    color: red;
}

/* 输入框占位符 */
input::placeholder {
    color: gray;
    font-style: italic;
}
```

---

# CSS 过渡（Transition）

过渡允许 CSS 属性值在一定时间内平滑变化。

## 基本语法

```css
.box {
    width: 100px;
    height: 100px;
    background: red;
    
    /* 过渡效果 */
    transition: all 0.3s ease;
}

.box:hover {
    width: 200px;
    background: blue;
}
```

## 过渡属性详解

```css
.element {
    /* 过渡属性 */
    transition-property: width, height, background-color;
    
    /* 过渡持续时间 */
    transition-duration: 0.5s;
    
    /* 过渡时间函数 */
    transition-timing-function: ease-in-out;
    
    /* 过渡延迟 */
    transition-delay: 0.2s;
    
    /* 简写：property duration timing-function delay */
    transition: width 0.5s ease-in-out 0.2s;
}
```

## 时间函数

| 值 | 描述 |
|-----|------|
| `linear` | 匀速 |
| `ease` | 慢 - 快 - 慢（默认） |
| `ease-in` | 慢速开始 |
| `ease-out` | 慢速结束 |
| `ease-in-out` | 慢速开始和结束 |
| `cubic-bezier(n,n,n,n)` | 自定义贝塞尔曲线 |

---

# CSS 动画（Animation）

动画允许元素逐渐从一种样式变为另一种样式。

## 关键帧动画

```css
/* 定义动画 */
@keyframes slideIn {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* 使用动画 */
.box {
    width: 100px;
    height: 100px;
    background: blue;
    animation: slideIn 1s ease-in-out;
}
```

## 复杂动画

```css
@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-50px);
    }
}

.ball {
    animation: bounce 1s infinite;
}
```

## 动画属性

```css
.element {
    /* 动画名称 */
    animation-name: myAnimation;
    
    /* 动画持续时间 */
    animation-duration: 2s;
    
    /* 时间函数 */
    animation-timing-function: ease-in-out;
    
    /* 延迟时间 */
    animation-delay: 0.5s;
    
    /* 播放次数 */
    animation-iteration-count: infinite;
    
    /* 播放方向 */
    animation-direction: alternate;
    
    /* 填充模式 */
    animation-fill-mode: forwards;
    
    /* 运行状态 */
    animation-play-state: running;
    
    /* 简写 */
    animation: myAnimation 2s ease-in-out 0.5s infinite alternate forwards;
}
```

---

# 媒体查询（Media Queries）

媒体查询使网页能够针对不同设备和屏幕尺寸应用不同的样式。

## 基本语法

```css
/* 针对小屏幕（手机） */
@media screen and (max-width: 768px) {
    .container {
        width: 100%;
        padding: 10px;
    }
}

/* 针对中等屏幕（平板） */
@media screen and (min-width: 769px) and (max-width: 1024px) {
    .container {
        width: 750px;
        margin: 0 auto;
    }
}

/* 针对大屏幕（桌面） */
@media screen and (min-width: 1025px) {
    .container {
        width: 960px;
        margin: 0 auto;
    }
}
```

## 常见断点

```css
/* 超小屏幕（手机，< 576px） */
@media (max-width: 575.98px) { }

/* 小屏幕（手机，≥ 576px） */
@media (min-width: 576px) and (max-width: 767.98px) { }

/* 中等屏幕（平板，≥ 768px） */
@media (min-width: 768px) and (max-width: 991.98px) { }

/* 大屏幕（桌面，≥ 992px） */
@media (min-width: 992px) and (max-width: 1199.98px) { }

/* 超大屏幕（大桌面，≥ 1200px） */
@media (min-width: 1200px) { }
```

## 响应式设计示例

```css
/* 移动端优先 */
.container {
    width: 100%;
    padding: 15px;
}

.nav {
    display: block;
}

/* 平板 */
@media (min-width: 768px) {
    .container {
        width: 750px;
        margin: 0 auto;
    }
    
    .nav {
        display: flex;
        justify-content: space-between;
    }
}

/* 桌面 */
@media (min-width: 992px) {
    .container {
        width: 960px;
    }
}

/* 大桌面 */
@media (min-width: 1200px) {
    .container {
        width: 1140px;
    }
}
```

---

# Position 定位

## 定位类型

```css
/* 静态定位（默认） */
.static {
    position: static;
}

/* 相对定位（相对于自身原位置） */
.relative {
    position: relative;
    top: 10px;
    left: 20px;
}

/* 绝对定位（相对于最近的定位祖先元素） */
.absolute {
    position: absolute;
    top: 0;
    right: 0;
}

.parent {
    position: relative; /* 作为绝对定位的参考 */
}

/* 固定定位（相对于浏览器窗口） */
.fixed {
    position: fixed;
    bottom: 0;
    right: 0;
}

/* 粘性定位（滚动时固定） */
.sticky {
    position: sticky;
    top: 0;
}
```

---

# Display 属性

```css
/* 块级元素 */
.block {
    display: block;
}

/* 行内元素 */
.inline {
    display: inline;
}

/* 行内块元素 */
.inline-block {
    display: inline-block;
}

/* Flex 布局 */
.flex {
    display: flex;
}

/* Grid 布局 */
.grid {
    display: grid;
}

/* 隐藏元素 */
.none {
    display: none;
}
```

---

# Box-sizing 属性

```css
/* 标准盒模型（width = content） */
.content-box {
    box-sizing: content-box;
}

/* IE 盒模型（width = content + padding + border） */
.border-box {
    box-sizing: border-box;
}

/* 推荐全局设置 */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
```

---

# CSS Grid 布局基础

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 列 */
    grid-template-rows: 100px 200px; /* 2 行 */
    gap: 20px; /* 间距 */
}

.item {
    background: lightblue;
}

/* 网格项跨列跨行 */
.item-1 {
    grid-column: 1 / 3; /* 跨 2 列 */
    grid-row: 1 / 2; /* 跨 1 行 */
}
```

---

# CSS 变量（自定义属性）

```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --font-size-base: 16px;
    --spacing-unit: 8px;
}

.button {
    background-color: var(--primary-color);
    font-size: var(--font-size-base);
    padding: calc(var(--spacing-unit) * 2);
}

/* 带默认值 */
.card {
    background: var(--card-bg, #ffffff);
}
```



---

# Flexbox 完整指南

## justify-content 属性（已完成文档中断部分）

justify-content 属性定义弹性项目在主轴上的对齐方式。

```css
.flex-container {
    display: flex;
    justify-content: flex-start;     /* 默认：左对齐 */
    justify-content: flex-end;       /* 右对齐 */
    justify-content: center;         /* 居中对齐 */
    justify-content: space-between;  /* 两端对齐，项目间隔相等 */
    justify-content: space-around;   /* 每个项目两侧间隔相等 */
    justify-content: space-evenly;   /* 所有间隔都相等 */
}
```

## align-items 属性

align-items 属性定义弹性项目在交叉轴上的对齐方式。

```css
.flex-container {
    display: flex;
    align-items: stretch;    /* 默认：拉伸填满容器 */
    align-items: flex-start; /* 交叉轴起点对齐 */
    align-items: flex-end;   /* 交叉轴终点对齐 */
    align-items: center;     /* 交叉轴居中对齐 */
    align-items: baseline;   /* 基线对齐 */
}
```

## align-content 属性

align-content 属性定义多行弹性项目在交叉轴上的对齐方式（仅在多行时有效）。

```css
.flex-container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;    /* 起点对齐 */
    align-content: flex-end;      /* 终点对齐 */
    align-content: center;        /* 居中对齐 */
    align-content: space-between; /* 两端对齐 */
    align-content: space-around;  /* 环绕对齐 */
    align-content: stretch;       /* 默认：拉伸 */
}
```

## flex-wrap 属性

flex-wrap 属性定义弹性项目是否换行。

```css
.flex-container {
    display: flex;
    flex-wrap: nowrap;      /* 默认：不换行 */
    flex-wrap: wrap;        /* 换行，第一行在上方 */
    flex-wrap: wrap-reverse;/* 换行，第一行在下方 */
}
```

## flex-flow 属性

flex-flow 属性是 flex-direction 和 flex-wrap 的简写。

```css
.flex-container {
    flex-flow: row nowrap;      /* 默认 */
    flex-flow: row wrap;
    flex-flow: column nowrap;
    flex-flow: column wrap;
}
```

## 子元素（项目）属性

### order 属性

order 属性定义项目的排列顺序，数值越小越靠前。

```css
.item {
    order: 0;  /* 默认值 */
}

.item-first {
    order: -1; /* 排在最前面 */
}

.item-last {
    order: 1;  /* 排在最后面 */
}
```

### flex-grow 属性

flex-grow 属性定义项目的放大比例。

```css
.item {
    flex-grow: 0;  /* 默认：不放大 */
}

.item-grow {
    flex-grow: 1;  /* 放大，占据剩余空间 */
}

.item-grow-more {
    flex-grow: 2;  /* 放大比例更大 */
}
```

### flex-shrink 属性

flex-shrink 属性定义项目的缩小比例。

```css
.item {
    flex-shrink: 1;  /* 默认：缩小 */
}

.item-no-shrink {
    flex-shrink: 0;  /* 不缩小 */
}
```

### flex-basis 属性

flex-basis 属性定义项目分配多余空间之前的默认大小。

```css
.item {
    flex-basis: auto;   /* 默认：根据内容大小 */
    flex-basis: 200px;  /* 固定大小 */
    flex-basis: 30%;    /* 百分比 */
}
```

### flex 属性

flex 属性是 flex-grow、flex-shrink 和 flex-basis 的简写。

```css
.item {
    flex: 0 1 auto;  /* 默认 */
    flex: 1;         /* flex: 1 1 0% */
    flex: 2;         /* flex: 2 2 0% */
    flex: none;      /* flex: 0 0 auto */
    flex: auto;      /* flex: 1 1 auto */
}
```

### align-self 属性

align-self 属性允许单个项目有自己的对齐方式（覆盖 align-items）。

```css
.item {
    align-self: auto;         /* 默认：继承 align-items */
    align-self: flex-start;   /* 起点对齐 */
    align-self: flex-end;     /* 终点对齐 */
    align-self: center;       /* 居中对齐 */
    align-self: baseline;     /* 基线对齐 */
    align-self: stretch;      /* 拉伸 */
}
```

## Flexbox 实用示例

### 水平垂直居中

```css
.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
```

### 圣杯布局（三列布局）

```css
.holy-grail {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.header, .footer {
    flex: 0 0 auto;
}

.body {
    display: flex;
    flex: 1;
}

.sidebar {
    flex: 0 0 200px;
}

.main {
    flex: 1;
}
```

### 导航栏布局

```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

.nav-left {
    display: flex;
    gap: 20px;
}

.nav-right {
    display: flex;
    gap: 10px;
}
```

### 等间距卡片布局

```css
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
}

.card {
    flex: 1 1 calc(33.333% - 20px);
    min-width: 250px;
}
```

### 响应式侧边栏

```css
.layout {
    display: flex;
}

.sidebar {
    flex: 0 0 250px;
}

.main {
    flex: 1;
}

/* 移动端 */
@media (max-width: 768px) {
    .layout {
        flex-direction: column;
    }
    
    .sidebar {
        flex: 0 0 auto;
    }
}
```
