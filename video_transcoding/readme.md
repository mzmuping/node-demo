### 视频转码

通过node结合node-fluent-ffmpeg进行视频转码

### 环境搭建
- 使用node-fluent-ffmpeg 插件时候需要搭建ffmpeg工具软件，[下载](http://ffmpeg.org/download.html),[windows下载](http://ffmpeg.org/download.html#build-windows)，找到符合自己系统版本（ffmpeg-n4.4.1-2-gcc33e73618-win64-gpl-4.4.zip），下载解压就可以。
- 解压后，把bin目录放在系统环境变量里
- 配置：我的电脑=》右击=》属性=》高级系统设置=》环境变量=》path中添加ffmpeg中bin目录
- 然后再cmd输入ffmpeg，看到不报错就成功

### 安装插件
index.js有案例
```js
npm install fluent-ffmpeg
or
yarn add fluent-ffmpeg
```


