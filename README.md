### Vue移动端项目-电子书阅读器

#### epub

```
电子书阅读器所需第三方包

https://github.com/futurepress/epub.js
```

#### 字体图标

```
1、iconfont网站生成矢量图标
	https://www.iconfont.cn/

2、icomoon网站根据矢量图标生成字体图标
	https://icomoon.io/app/#/select
```

#### Web字体

```
css3 开始支持

1、导入web字体
	import './assets/fonts/daysOne.css'
	
2、在样式中设置font-family
	.text{
        font-family: 'Days One';
        font-size: 30px;
        color:orange;
    }
```

#### reset.scss & global.scss

```
reset.scss
	https://meyerweb.com/eric/tools/css/reset/
```

#### nginx【windows】

```
一个非常有名的web服务器

下载地址：
	http://nginx.org/en/download.html
	
常见命名：
	启动：./nginx.exe
	停止：./nginx -s stop
	重启：./nginx -s reload
	查看当前配置文件是否有效：./nginx -t
	
更改nginx配置
	找到 nginx/conf/nginx.conf 文件更改配置即可
```

#### vue调试工具【桌面版】

```
1、全局安装@vue/devtools
	cnpm install -g @vue/devtools
	
2、运行vue-devtools
	vue-devtools
	
3、在项目的 public/index.html 中引入脚本
	<script src="http://localhost:8098"></script>
	
4、启动项目即可
	npm run serve
```

#### 加载及渲染电子书

```
1、导入相关包
	import Epub from 'epubjs'
	
2、设置渲染的视图
	<div id="read"></div>
	
3、创建及渲染
	this.book = new Epub(url)
    this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        method:'default' // 兼容微信浏览器
    })
    this.rendition.display()
    
4、epub中的事件处理
	注意：epubjs版本的0.3.71才支持touch事件，新版本暂时不支持
	
	this.rendition.on('事件名称'，event => {
		
	})
```

#### epubjs 常用API

```
上一页：this.rendition.prev()

下一页：this.rendition.next()

设置字体大小：this.book.rendition.themes.fontSize(字体大小)

设置字体：this.book.rendition.themes.font(字体)

加载字体文件: this.rendition.hooks.content.register(contents => {})
	contents 用于管理资源
	
注册主题：this.rendition.themes.register(样式名称,样式的style)

设置默认主题：this.rendition.themes.select(主题名字)

电子书解析完毕：this.currentBook.ready(() => {})

获取章节信息：this.currentBook.section(第几章节)

跳转到某个章节：this.currentBook.rendition.display(sectionInfo.href)

获取电子书总章节数：this.currentBook.spine

获取电子书阅读当前位置：this.currentBook.rendition.currentLocation()

根据cfi获取进度：this.currentBook.locations.percentageFromCfi(currentLocation.start.cfi)

根据章节获取目录：this.currentBook.navigation.get(sectionInfo.href)
```

#### 全局样式设置【非epub】

```
通过在 head 中动态引入 link 样式实现
```

