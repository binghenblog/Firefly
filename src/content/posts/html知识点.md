---
title: HTML5知识点
published: 2025-01-12 16:00:00
category: Web前端开发
tags: [Web, html]
---

# HTML5介绍

HTML5是用来描述网页的一种语言，被称为超文本标记语言。用HTML5编写的文件，后缀以`.html`结尾

HTML是一种标记语言，标记语言是一套标记标签。

标签是有尖括号包围的关键字，例如：`<html>`

标签有两种表现形式：

1. 双标签，例如：`<html></html>`
2. 单标签，例如：`<img>`

# HTML5的DOCTYPE声明

DOCTYPE是document type(文档类型)的缩写。`<!DOCTYPE html>`是H5的声明位于文档的最前面，处于标签之前。它是网页必备的组成部分，避免浏览器的怪异模式。

```html
<!DOCTYPE html>
```

# HTML5基本骨架

### html标签

定义HTML文档，这个元素我们浏览器看到后就明白这是个HTML文档了，所以一些元素要包裹在它里面，标签限定了文档的开始点和结束点。

```html
<!DOCTYPE html>
<html>
</html>
```

### head标签

head标签用于定义文档的头部。文档的头部描述了文档的各种属性和信息，包括文档的标题、在Web中的位置以及和其他文档的关系等。绝大多数文档头部包括的数据都不会真正作为内容显示给读者。

```html
<!DOCTYPE html>
<html>
    <head>
    </head>
</html>
```

### body标签

body元素定义文档的主题。

body元素包含文档的所有内容(比如文本、超链接、图像、表格和列表等)

它会直接在页面中显示出来，也就是用户可以以直接观看到的内容。

```html
<!DOCTYPE html>
<html>
    <head></head>
    <body>
    文字会显示在浏览器中
    </body>
</html>
```

### title标签

1. 可定义文档的标题。
2. 它显示在浏览器窗口的标题栏或状态栏上。
3. `<title>`标签是`<head>`标签中唯一必须要求包含内容，也就是说写head一定要写title。
4. `<title>`的增加有利于SEO优化。

```
SEO是搜索引擎优化的英文缩写。通过对网站内容调整，满足搜索引擎的排名需求
```

```html
<!DOCTYPE html>
<html>
    <head>
        <title>第一个页面</title>
    </head>
    <body>
    文字会显示在浏览器中
    </body>
</html>
```

### meta标签

meta标签用来描述一个HTML网页文档的属性，关键词等，例如：`charset="utf-8"`是说当前使用的是`utf-8`编码格式，在开发中会经常看到`utf-8`或者是`gbk`，这些都是编码格式，通常使用`utf-8`。

```html
<!DOCTYPE html>
<html lang='en'>
    <head>
        <meta charset="UTF-8">
        <title>标题</title>
    </head>
    <body></body>
</html>
```

# 标题

### 标题介绍与应用

标题(Heading)是通过`<h1>-<h6>`标签进行定义的。

`<h1>`定义最大的标题 `<h6>`定义最小的标题

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```

```
生成h1~h6快捷键：h$*6
```

### 正确使用标题

请确保将HTML标题标签只用于标题。

不要仅仅是为了生成粗体或大号的文本而使用标题。

正确使用标题有益于SEO

应该将`<h1>`用作主标题(最重要的),其次是`<h2>`(次重要的)，以此类推

### 标题标签位置摆放

在标签中添加属性：`align="left | center | right"`默认居左

```html
<h1 align="center">文字居中</h1>
```

# 段落、换行、水平线

### 段落

段落是通过`<p>`标签定义的

```html
<p>这是一个段落标签</p>
```

### 换行

如果想要换行就用`<br>`

`<br>`元素是一个空的HTML元素

```html
<p>这个<br>段落<br>演示了分行的效果</p>
```

### 水平线

`<hr/>`标签在HTML页面中创建水平线

```html
<hr color="" width="" size="" align=""/>
```

属性：

1. color：设置水平线的颜色
2. width：设置水平线的长度
3. size：设置水平线的高度
4. align：设置水平线的对齐方式(默认是居中)，可选择`left | right`

# 图片

网站中最多的元素，正常来讲是图片

`<img>`标签定义HTML页面中的图像(此标签是单标签，不需要进行闭合操作)

```html
<img src="" alt="" title="" width="" height="">
```

属性：

1. src：路径(图片的地址与名字)
2. alt：规定图像的替代文本
3. width：规定图像的宽度
4. height：规定图像的高度
5. title：鼠标悬停在图片上给予提示

# 路径详解

### 绝对路径

绝对路径是电脑的盘符存储与访问的具体地址

```
E:\img\1.png
```

```html
<img src="E:\img\1.png">
```

### 相对路径

两者相对的关系，两者在同一路径下可以直接访问

1. 子级关系：`/`
2. 父级关系：`../`
3. 同级关系：`./`

### 网络路径

网络中的具体地址：`https:\\......`

# 超文本链接

### 超链接描述

HTML使用标签`<a>`来设置超文本链接

超文本链接可以是一个字，一个词，或者是一组词，也可以是图片，可以点击这些内容来跳转到新的文档或者当前文档中的某个部分。

```html
<a href="地址">链接文本</a>
```

### 超链接属性

在标签`<a>`中使用了`href`属性来描述链接的地址

默认情况下，链接将以以下形式出现在浏览器中：

1. 一个未访问过的链接显示为蓝色字体并带有下划线。
2. 访问过的链接显示为紫色并带有下划线。
3. 点击链接时，链接显示为红色并带有下划线。

> \[!NOTE]特别提示：
>
> 后期可以通过CSS样式修改掉这些效果。

### 超链接表现

当把鼠标指针移动到网页中的某个链接上时，箭头会变成一个小手。

# 文本

### 常用文本标签

| 标签         | 描述        |
| ---------- | --------- |
| `<em>`     | 定义着重文字    |
| `<b>`      | 定义粗体文本    |
| `<i>`      | 定义斜体字     |
| `<strong>` | 定义加重语气    |
| `<del>`    | 定义删除字     |
| `<span>`   | 元素没有特定的含义 |

> \[!NOTE]特别提示：
>
> 常用文本标签和段落时不同的，段落代表一段文本，而文本标签一般表示文本词汇。

# 列表

### 有序列表

有序列表时一列项目，列表项目使用数字进行标记。

有序列表始于`<ol>`标签。每个列表始于`<li>`标签

```html
<ol>
    <li>第一</li>
    <li>第二</li>
</ol>
```

type属性

`<ol>`的属性type拥有的选项：

1. 1 表示列表项目用数字标号(1,2,3...)
2. a 表示列表项目用小写字母标号(a,b,c...)
3. A 表示列表项目用大写字母标号(A,B,C...)
4. i 表示列表项目用小写罗马数字标号(i,ii,iii...)
5. l 表示列表项目用大写罗马数字标号(I,II,III...)

```html
<ol type="a">
    <li>苹果</li>
    <li>香蕉</li>
</ol>
```

### 无序列表

无序列表是一个项目的列表，此列项目使用粗体圆点(经典的小黑圆圈)进行标记

无序列表始于`<ul>`标签。每个列表项始于`<li>`标签

```html
<ul>
    <li>第一</li>
    <li>第二</li>
</ul>
```

type属性

`<ul>`的属性type拥有的选项：

1. disc 实心圆(默认)
2. circle 空心圆
3. square 小方块
4. none 不显示

常见应用场景

1. 导航页面！！！
2. 无序的列表效果

> \[!NOTE]快捷键：
>
> 快速生成ul+li的布局：ul>li\*3 (数字根据自己的需要的li数量修改)

# 表格

### 表格组成和特点

组成：行、列、单元格

单元格特点：同行等高、同列等宽

### 表格标签

表格：`<table>`

行：`<tr>`

单元格(列)：`<td>`

```html
<table>
    <tr>
        <td>张三</td>
        <td>李四</td>
    </tr>
    <tr>
		<td>王五</td>
        <td>赵六</td>
    </tr>
</table>
```

> \[!NOTE]快捷键：
>
> 快速生成表格结构：table>tr\*2>td{文本信息}

### 表格属性

1. border：设置表格的边框
2. width：设置表格的宽度
3. height：设置表格的高度

### 单元格合并

1. 水平合并：colspan(保留左边，删除右边)
2. 垂直合并：rowspan(保留上面，删除下边)

# Form表单

表单在Web网页中用来给用户填写信息，从而能采集用户信息，使网页具有交互的功能。

所有的用户输入内容的地方都用表单来写，如登录注册、搜索框。

表单是由容器和控件组成的，一个表单一般应该包括用户填写信息的输入框，提交按钮等，这些输入框，按钮叫做控件，表单就是容器，它能够容纳各种各样的控件。

```html
<form action="url" method="get|post" name="myform"></form>
```

### 属性说明

action：服务器地址

name：表单名称

method中Get和Post的区别

1. 数据提交方式，get把提交的数据url可以看到，post看不到
2. get一般用于提交少量数据，post用来提交大量数据

### 表单元素

一个完整的表单包含三个基本组成部分：表单标签、表单域、表单按钮

1. 表单标签(整体)
2. 表单域(输入框)
3. 表单按钮(例如：提交按钮)

```html
<form>
    <input type="text">
    <input type="submit">
    <button>按钮名字</button>
</form>
```

### 文本框

文本域通过`<input type="text">`标签来设定，当用户要在表单中输入字母、数字等内容时，就会用到文本域

```html
<form>
    第一个用户名: <input type="text" name="firstname">
    <br>
    第二个用户名: <input type="text" name="lastname">
</form>
```

### 密码框

密码字段通过标签`<input type="password">`来定义

```html
<form>
    密码: <input type="password" name="pwd">
</form>
```

> \[!NOTE]
>
> 密码字段字符不会明文显示，而是以星号或者圆点来替代

### 提交按钮

当用户单击确认按钮时，表单的内容会被传送到另一个文件。

表单的动作属性定义了目的文件的文件名。

由动作属性定义的这个文件通常会对接受到的输入数据进行相关的处理。

```html
<form name="input" action="url" method="get">
    用户名: <input type="text" name="user">
    密码: <input type="password" name="pwd">
    <input type="submit" value="提交">
</form>
```

# 块元素与行内元素(内联元素)

HTML5出现之前，经常把元素按照块级元素和内联元素来区分。

在HTML5中，元素不再按照这种方式来区分，而是按照内容模型来区分，分为元数据型(metadata content)、区块型(sectioning content)、标题型(heading content)、文档流型(flow content)、语句型(phrasing content)、内嵌型(embedded content)、交互型 (interactive content)。元素不属于任何一个类别，被称为穿透的，元素可能属于不止一个类别，称为混合的。

### 内联元素和块级元素的区别

| 块级元素                  | 内联元素                   |
| ----- | ------ |
| 块元素在页面中独占一行(自上向下垂直排列) | 行内元素不会独占页面中的一行，只占自身的大小 |
| 可以设置width，height属性    | 行内元素设置width，height属性无效 |
| 一般块级元素可以包含行内元素和其他块级元素 | 一般内联元素包含内联元素不包含块级元素    |

常见的块级元素(独占一行)

> div、form、h1\~h6、hr、p、table、ul等

常见的内联元素(行内元素)

> a、b、em、i、span、strong等

行内块级元素(特点：不换行、能够识别宽高)

> button、img、input等

# HTML5新增标签

HTML5是HTML最新的修订版本，2014年10月由万维网联盟(W3C)完成标准制定

在HTML5出现之前，一般采用DIV+CSS布局页面。

但是这样的布局方式不仅使我们的文档结构不够清晰，而且**不利于搜索引擎爬虫对我们页面的爬取(不利于SEO)**。为了解决上述缺点，HTML5 新增了很多新的语义化标签

# 扩展知识

div容器元素，夜市页面中见到的最多的元素

以前的网页标签

```html
<div id="header"></div>
<div id="nav"></div>
<div id="article"
	<div id="section"></div>
</div>
<div id="silder"></div>
<div id="footer"></div>
```

现在HTML5的用法

```html
<header></header>
<nav></nav>
<article>
	<section></section>
</article>
<aside></aside>
<footer></footer>
```

HTML5新标签

1. `<header></header>`头部
2. `<nav></nav>`导航
3. `<section></section>`定义文档中的节，比如章节、页眉、页脚
4. `<aside></aside>`侧边栏
5. `<footer></footer>`脚部
6. `<article></article>`代表一个独立的、完整的相关内容块，例如一篇完整的论坛帖子，一个博客文章，一个用户评论等


# HTML5 表单新特性

## 新增 input 类型

HTML5 新增了多种 input 类型，提供更好的输入验证和用户体验：

```html
<!-- 邮箱输入，自动验证格式 -->
<input type="email" name="email">

<!-- 网址输入 -->
<input type="url" name="website">

<!-- 数字输入，可设置范围 -->
<input type="number" name="age" min="1" max="100">

<!-- 电话号码 -->
<input type="tel" name="phone">

<!-- 日期选择器 -->
<input type="date" name="birthdate">

<!-- 时间选择器 -->
<input type="time" name="meeting-time">

<!-- 颜色选择器 -->
<input type="color" name="favcolor">

<!-- 搜索框 -->
<input type="search" name="q">

<!-- 范围滑块 -->
<input type="range" name="points" min="0" max="100">
```

## 新增表单属性

```html
<!-- 自动聚焦 -->
<input type="text" name="username" autofocus>

<!-- 必填项 -->
<input type="text" name="username" required>

<!-- 占位符提示文本 -->
<input type="text" name="username" placeholder="请输入用户名">

<!-- 禁用字段 -->
<input type="text" name="username" disabled>

<!-- 只读字段 -->
<input type="text" name="username" readonly value="张三">

<!-- 自动完成 -->
<input type="text" name="username" autocomplete="on">

<!-- 正则表达式验证 -->
<input type="text" name="username" pattern="[A-Za-z]{3,}" title="至少 3 个字母">
```

---

# HTML5 语义化标签详解

## 主要语义化标签

| 标签 | 描述 | 使用场景 |
|------|------|----------|
| `<header>` | 页面或区域的页眉 | 网站 logo、导航、搜索框 |
| `<nav>` | 导航链接容器 | 主导航、侧边栏导航、面包屑 |
| `<main>` | 文档主要内容 | 页面的核心内容区域（唯一） |
| `<article>` | 独立完整的内容块 | 博客文章、新闻、论坛帖子 |
| `<section>` | 文档中的节或区域 | 章节、功能模块 |
| `<aside>` | 侧边栏或附属内容 | 相关链接、广告、作者简介 |
| `<footer>` | 页面或区域的页脚 | 版权信息、联系方式、社交链接 |
| `<figure>` | 独立的流内容（图片、图表等） | 图片、代码示例、图表 |
| `<figcaption>` | figure 的标题 | 图片说明、图表标题 |
| `<time>` | 时间或日期 | 发布时间、事件时间 |
| `<mark>` | 高亮文本 | 搜索结果高亮、重点标记 |
| `<progress>` | 进度条 | 文件上传、任务进度 |
| `<meter>` | 标量测量 | 磁盘使用率、评分 |

## 语义化标签示例

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>语义化标签示例</title>
</head>
<body>
    <header>
        <h1>网站标题</h1>
        <nav>
            <ul>
                <li><a href="#home">首页</a></li>
                <li><a href="#about">关于</a></li>
                <li><a href="#contact">联系</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <header>
                <h2>文章标题</h2>
                <time datetime="2025-01-15">2025 年 1 月 15 日</time>
            </header>
            
            <section>
                <p>文章内容...</p>
            </section>
            
            <aside>
                <h3>作者简介</h3>
                <p>作者信息...</p>
            </aside>
            
            <footer>
                <p>标签：HTML5, CSS3, Web</p>
            </footer>
        </article>
    </main>

    <footer>
        <p>&copy; 2025 公司名称。保留所有权利。</p>
    </footer>
</body>
</html>
```

---

# HTML5 多媒体标签

## 视频标签

```html
<video width="640" height="480" controls autoplay loop muted>
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.ogg" type="video/ogg">
    您的浏览器不支持 video 标签。
</video>
```

### video 属性

| 属性 | 值 | 描述 |
|------|-----|------|
| controls | - | 显示播放控件 |
| autoplay | - | 自动播放 |
| loop | - | 循环播放 |
| muted | - | 静音 |
| preload | auto/metadata/none | 预加载策略 |
| poster | URL | 封面图片 |
| width/height | 像素 | 宽高 |

## 音频标签

```html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    您的浏览器不支持 audio 标签。
</audio>
```

---

# HTML5 Canvas 基础

Canvas 用于通过 JavaScript 绘制图形：

```html
<canvas id="myCanvas" width="200" height="100"></canvas>

<script>
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    
    // 绘制矩形
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 150, 75);
    
    // 绘制线条
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();
    
    // 绘制圆形
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();
</script>
```

---

# HTML5 本地存储

## localStorage（永久存储）

```javascript
// 存储数据
localStorage.setItem("username", "张三");

// 读取数据
var name = localStorage.getItem("username");

// 删除数据
localStorage.removeItem("username");

// 清空所有
localStorage.clear();
```

## sessionStorage（会话存储）

```javascript
// 存储数据
sessionStorage.setItem("key", "value");

// 读取数据
var value = sessionStorage.getItem("key");

// 删除数据
sessionStorage.removeItem("key");
```

---

# HTML5 可访问性（ARIA）

ARIA（Accessible Rich Internet Applications）用于增强网页的可访问性，帮助残障用户（如视障者）使用辅助技术访问网页。

## 常用 ARIA 属性

```html
<!-- aria-label：为元素提供可访问的名称（屏外可见） -->
<button aria-label="关闭对话框">×</button>

<!-- aria-labelledby：关联其他元素作为标签 -->
<input type="text" aria-labelledby="name-label">
<span id="name-label">姓名</span>

<!-- aria-describedby：提供额外描述信息 -->
<input type="password" aria-describedby="pwd-rule">
<span id="pwd-rule">密码至少 8 位，包含字母和数字</span>

<!-- aria-hidden：对辅助技术隐藏元素 -->
<i class="icon" aria-hidden="true"></i>

<!-- role：定义元素角色 -->
<nav role="navigation">...</nav>
<div role="alert">错误提示</div>
```

## 常见 role 值

| Role | 用途 |
|------|------|
| `navigation` | 导航区域 |
| `main` | 页面主要内容 |
| `banner` | 网站 banner/header |
| `contentinfo` | 版权/footer 信息 |
| `alert` | 重要提示信息（自动朗读） |
| `dialog` | 对话框 |
| `tabpanel` | 选项卡面板 |
| `button` | 可点击按钮（非 `<button>` 元素） |

## 无障碍最佳实践

1. **使用语义化 HTML 标签**（优先于 ARIA）
2. **所有图片添加 `alt` 属性**
3. **表单元素关联 `<label>` 标签**
4. **确保颜色对比度达标**（WCAG AA 标准：普通文本 ≥ 4.5:1）
5. **支持键盘导航**（Tab 顺序 + 焦点样式）
6. **动态内容更新使用 `aria-live` 区域**

```html
<!-- aria-live：动态内容更新时自动朗读 -->
<div aria-live="polite">
    <!-- 消息更新时辅助技术会朗读 -->
    您有 3 条新消息
</div>

<!-- 表单标签关联 -->
<label for="email">邮箱地址：</label>
<input type="email" id="email" required aria-required="true">

<!-- 错误提示关联 -->
<input type="text" aria-invalid="true" aria-describedby="err-msg">
<span id="err-msg" role="alert">此项为必填</span>
```

---

# HTML5 新特性总结

1. **语义化标签**：header、nav、main、article、section、aside、footer 等
2. **表单增强**：新的 input 类型、表单验证、自动聚焦
3. **多媒体支持**：video、audio 标签
4. **图形绘制**：Canvas、SVG
5. **本地存储**：localStorage、sessionStorage
6. **地理定位**：Geolocation API
7. **拖放 API**：Drag and Drop
8. **Web Workers**：后台线程
9. **WebSocket**：双向通信
