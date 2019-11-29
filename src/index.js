const koa = require('koa');
const router = require('koa-router')();
const app = new koa();
const cp = require('child_process');

//挂载Middleware 1
app.use(async (ctx, next) => {
  ctx.username = '第一个中间件插入值';
  console.log('middleware 同步1');
  await next();
  console.log('middleware 异步1');
});
//挂载middleware 2
app.use(async (ctx, next) => {
  console.log('middleware 同步2');
  await next();
  console.log('middleware 异步2');
});

// 挂载路由
router.get('/bm', (ctx, next) => {
  ctx.body = 'ctx.body' + ctx.username;
});

app.use(router.routes());
//启动服务
app.listen(3002, function() {
  cp.exec('open http://localhost:3002/bm');
  console.log(' koa service running on http://localhost:3002/bm');
});
