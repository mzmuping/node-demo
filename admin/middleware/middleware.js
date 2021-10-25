// 定义简单的三个中间件
const httpMeth1 = (req, res, next) => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('我是请求1')

    }, 1000)
  }).then((res) => {
    console.log(res)
    next()
  })
}
// 也可以用 async
const httpMeth2 = async (req, res, next) => {
  console.log('我是请求2')
  return next().then((res) => {

    console.log(res, '我是请求2回调')
  })
}
const httpMeth3 = (req, res, next) => {
  // 如果中间件中有异步操作，需要在异步操作完成后再调用next
  /* new Promise((resolve, reject) => {
     console.log('我是请求3')
   }).then(() => {
     next()
   }) */
  console.log('我是请求3');
  return next().then((res) => {
    console.log(res, '我是请求3回调')
  })
}
// 中间件数组
const allHttpMeth = [httpMeth1, httpMeth2, httpMeth3]
function run(req, res) {
  const next = () => {

    // 获取中间件
    const allHttpMethitem = allHttpMeth.shift()

    if (allHttpMethitem) {
      // 执行
      return Promise.resolve(allHttpMethitem(req, res, next))
    } else {
      return Promise.resolve('结束')
    }
  }
  next()
}
run() // 模拟请求发起



