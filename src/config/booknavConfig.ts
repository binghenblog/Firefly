import type { BooknavGroup, BooknavPageConfig } from "../types/booknavConfig";

// 书签导航页面配置
export const booknavPageConfig: BooknavPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// favicon 自动获取配置
	favicon: {
		// 书签未填写 icon 时，是否自动获取目标站点的 favicon 图标
		enabled: true,

		// favicon 接口地址，{domain} 为占位符，会被替换成目标站点域名
		// 更换接口只需保证地址里含有 {domain}，例如：
		//   https://a.favicon.im/{domain}
		//   https://favicon.im/{domain}
		api: "https://a.favicon.im/{domain}",
	},
};

// 书签导航配置
// 每个数组项是一个分类组，分类组内的 items 是该分类下的书签
export const booknavConfig: BooknavGroup[] = [
	{
		id: "dev",
		name: "开发",
		icon: "material-symbols:code-rounded",
		desc: "写代码时离不开的站点",
		weight: 100,
		items: [
			{
				title: "GitHub",
				url: "https://github.com",
				desc: "全球最大的代码托管平台",
				// icon 字段可以使用 astro-icon 图标库的图标名称
				// 也可以使用图片 URL 和本地图片路径
				// 不填则会通过接口自动获取目标站点的 favicon 图标（需要在上面配置）
				icon: "fa7-brands:github",
				weight: 10,
			},
			{
				title: "MDN Web Docs",
				url: "https://developer.mozilla.org",
				desc: "最权威的 Web 技术文档",
				weight: 9,
			},
			{
				title: "Astro",
				url: "https://astro.build",
				desc: "内容驱动型网站的 Web 框架",
				weight: 8,
			},
			{
				title: "Svelte",
				url: "https://svelte.dev",
				desc: "把组件编译成高效原生 JS 的框架",
				weight: 7,
			},
			{
				title: "Tailwind CSS",
				url: "https://tailwindcss.com",
				desc: "一个功能强大且灵活的 CSS 框架",
				weight: 6,
			},
		],
	},
	{
		id: "opensource",
		name: "项目",
		icon: "material-symbols:code-rounded",
		desc: "好用的开源项目",
		weight: 90,
		items: [
			{
				title: "Firefly",
				url: "https://github.com/CuteLeaf/Firefly",
				desc: "清晰美观的 Astro 个人博客主题模板",
				icon: "/favicon/firefly-32.png",
				weight: 10,
			},
			{
				title: "AstrBot",
				url: "https://github.com/AstrBotDevs/AstrBot",
				desc: "开源一站式Agentic个人和群聊助手",
				weight: 9,
			},
		],
	},
	{
		id: "design",
		name: "设计",
		icon: "material-symbols:palette-outline-rounded",
		desc: "配色、图标与灵感来源",
		weight: 90,
		items: [
			{
				title: "Iconify",
				url: "https://icon-sets.iconify.design",
				desc: "海量开源图标集合搜索",
				weight: 10,
			},
			{
				title: "iconfont",
				url: "https://www.iconfont.cn",
				desc: "阿里巴巴矢量图标库",
				weight: 9,
			},
		],
	},
	{
		id: "tools",
		name: "工具",
		icon: "material-symbols:build-outline-rounded",
		desc: "顺手的在线小工具",
		weight: 80,
		items: [
			{
				title: "TinyPNG",
				url: "https://tinypng.com",
				desc: "在线压缩 PNG / JPEG 图片",
				weight: 10,
			},
			{
				title: "Ainexis Tools",
				url: "https://tools.ainexis.cn/",
				desc: "免费在线工具箱",
				weight: 9,
			},
			{
				title: "图吧工具箱",
				url: "https://tubawinui3.cn/",
				desc: "WinUI3重构版",
				weight: 9,
			},
			{
				title: "Squoosh",
				url: "https://squoosh.app",
				desc: "Google 出品的图片压缩与格式转换",
				weight: 8,
			},
			{
				title: "Carbon",
				url: "https://carbon.now.sh",
				desc: "把代码片段生成漂亮的图片",
				weight: 8,
			},
			{
				title: "Mult.dev",
				url: "https://mult.dev/",
				desc: "生成地图轨迹",
				weight: 7,
			},
			{
				title: "偷懒工具",
				url: "https://toolight.cn/",
				desc: "做更好用的在线工具",
				weight: 6,
			},
			{
				title: "瓦特工具箱",
				url: "https://steampp.net/",
				desc: "Steam++ 多功能游戏工具箱",
				weight: 5,
			},
			{
				title: "跨平台划词翻译和 OCR",
				url: "https://pot-app.com/",
				desc: "Pot 跨平台划词翻译与 OCR 工具",
				weight: 4,
			},
			{
				title: "跨平台桌面宠物",
				url: "https://bongocat.gjxx.dev/",
				desc: "开源桌面宠物 Bongo Cat",
				weight: 3,
			},
			{
				title: "以图搜番",
				url: "https://ai.animedb.cn/",
				desc: "以图搜番，识别动漫出处",
				weight: 2,
			},
			{
				title: "Sakura Frp | 樱花内网穿透",
				url: "https://www.natfrp.com/",
				desc: "免费内网穿透服务",
				weight: 1,
			},
			{
				title: "GitHub 下载加速",
				url: "https://gh-proxy.com/",
				desc: "GitHub 文件下载加速代理",
				weight: 1,
			},
			{
				title: "GenOffice",
				url: "https://genoffice.ai/",
				desc: "开源AI办公套件",
				weight: 1,
			},
		],
	},
	{
		id: "resources",
		name: "资源",
		icon: "material-symbols:auto-stories-outline-rounded",
		desc: "文档、教程与阅读",
		weight: 70,
		items: [
			{
				title: "Firefly Docs",
				url: "https://docs-firefly.cuteleaf.cn",
				desc: "Firefly 主题模板文档",
				icon: "https://docs-firefly.cuteleaf.cn/logo.png",
				weight: 10,
			},
			{
				title: "夏夜流萤",
				url: "https://blog.cuteleaf.cn",
				desc: "飞萤之火自无梦的长夜亮起",
				weight: 9,
			},
			{
				title: "菜鸟教程",
				url: "https://www.runoob.com/",
				desc: "学习编程网站",
				weight: 8,
			},
			{
				title: "iFixit:免费修理手册",
				url: "https://zh.ifixit.com/",
				desc: "各种修理教程",
				weight: 7,
			},
			{
				title: "软仓",
				url: "https://www.ruancang.net/",
				desc: "常用软件下载",
				weight: 6,
			},
			{
				title: "freemediaheckyeah",
				url: "https://fmhy.net/",
				desc: "互联网上最大的免费内容集合",
				weight: 5,
			},
			{
				title: "Developer Roadmaps",
				url: "https://roadmap.sh/",
				desc: "开发人员线路图",
				weight: 4,
			},
			{
				title: "uiverrse",
				url: "https://uiverse.io/",
				desc: "最大的开源UI元素库",
				weight: 3,
			},
			{
				title: "daisyUI",
				url: "https://daisyui.com/",
				desc: "CSS开源组件库",
				weight: 2,
			},
			{
				title: "iCSS",
				url: "https://github.com/chokcoco/iCSS",
				desc: "许多有趣的CSS",
				weight: 1,
			},
			{
				title: "Anime Garden",
				url: "https://animes.garden/",
				desc: "全部的资源视频游戏下载",
				weight: 1,
			},
			{
				title: "城市租房生存指南",
				url: "https://zufang.ababtools.com/",
				desc: "租房避坑攻略集合",
				weight: 0,
			},
			{
				title: "hellowindows",
				url: "https://hellowindows.cn/",
				desc: "Windows 软件与资源下载",
				weight: 0,
			},
			{
				title: "MSDN系统库",
				url: "https://www.xitongku.com/index.html",
				desc: "Windows 系统镜像下载",
				weight: 0,
			},
			{
				title: "Knowledge Base",
				url: "https://kb.ruoyi.plus/",
				desc: "若依框架知识库",
				weight: 0,
			},
		],
	},
	{
		id: "mirror",
		name: "镜像站",
		icon: "material-symbols:cloud-outline-rounded",
		desc: "国内开源软件镜像源",
		weight: 65,
		items: [
			{
				title: "清华大学开源软件镜像站",
				url: "https://mirrors.tuna.tsinghua.edu.cn/",
				desc: "清华大学开源软件镜像站",
				weight: 4,
			},
			{
				title: "阿里巴巴开源镜像站",
				url: "https://developer.aliyun.com/mirror/",
				desc: "阿里巴巴开源软件镜像",
				weight: 3,
			},
			{
				title: "中科大开源镜像站",
				url: "https://mirrors.ustc.edu.cn/",
				desc: "中国科学技术大学开源软件镜像",
				weight: 2,
			},
			{
				title: "华为开源镜像站",
				url: "https://mirrors.huaweicloud.com/home",
				desc: "华为云开源软件镜像",
				weight: 1,
			},
		],
	},
	{
		id: "game",
		name: "游戏",
		icon: "material-symbols:sports-esports-outline-rounded",
		desc: "游戏与游戏资源",
		weight: 60,
		items: [
			{
				title: "Steam",
				url: "https://store.steampowered.com",
				desc: "Steam 官网",
				weight: 10,
			},
			{
				title: "MC导航网",
				url: "https://www.mcnav.net/",
				desc: "Minecaft网址导航站",
				weight: 9,
			},
			{
				title: "MC百科",
				url: "https://www.mcmod.cn/",
				desc: "最大的Minecraft中文mod百科",
				weight: 8,
			},
			{
				title: "Minecraft汉化补丁分享站",
				url: "https://www.ningnana.top/",
				desc: "好用的整合包汉化补丁站",
				weight: 7,
			},
			{
				title: "flysheep资源避难所",
				url: "https://flysheep.ysepan.com/",
				desc: "游戏资源整合",
				weight: 6,
			},
			{
				title: "红警3WIKI",
				url: "https://wiki.biligame.com/redalert3",
				desc: "红警三百科",
				weight: 5,
			},
			{
				title: "植物大战僵尸杂交版",
				url: "https://www.pvzhe.com/",
				weight: 4,
			},
			{
				title: "红警3日冕",
				url: "https://cor-games.com/",
				weight: 3,
			},
			{
				title: "红警3战网服务",
				url: "https://ra3battle.net/",
				weight: 2,
			},
		],
	},
];
