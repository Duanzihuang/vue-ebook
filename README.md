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

