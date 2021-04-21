const koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const indexRoutes = require('./routes/index');
const ocrRoutes = require('./routes/ocr')
const moviesRoutes = require('./routes/movies');
const fs = require('fs');
const app = new koa();
const PORT = 1337;


app.use(async (ctx, next) => {
  // 允许来自所有域名请求
  ctx.set("Access-Control-Allow-Origin", "*");
  // 这样就能只允许 http://localhost:8080 这个域名的请求了
  // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080"); 

  // 设置所允许的HTTP请求方法
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

  // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");

  // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

  // Content-Type表示具体请求中的媒体类型信息
  ctx.set("Content-Type", "application/json;charset=utf-8");

  // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
  // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
  ctx.set("Access-Control-Allow-Credentials", true);

  // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
  // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
  // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
  ctx.set("Access-Control-Max-Age", 300);


  
  await next();
})


app.use(bodyParser({formLimit: "5MB"}))
app.use(indexRoutes.routes());
app.use(moviesRoutes.routes());
app.use(ocrRoutes.routes());

/**
 * markdown test
 */
 var md = require('markdown-it')();
 var result = md.render('# markdown-it rulezz!');
 var inputfile = path.join(__dirname, 'docs', 'index.md')
 var outputfile = path.join(__dirname, 'docs', 'html', 'index.html')
 try {
    const data = fs.readFileSync(inputfile, 'utf8')
    var result = md.render(data);
    fs.writeFileSync(outputfile, result)
  } catch (err) {
    console.error(err)
  }



const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})

module.exports = server

