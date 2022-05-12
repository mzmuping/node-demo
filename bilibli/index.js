const ibili = require('ibili')
const fs = require('fs')

ibili.downloadVideo({
    url: 'https://www.bilibili.com/video/BV1wy4y1D7JT?p=1',
    progress: {
        length: 100
    },
    // sessdata: '02d7f20a%2C1654667620%2C071d4%2Ac1',
    // num: 3
}).then(res => {
    console.log('视频下载完成！')
})