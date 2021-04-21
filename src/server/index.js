const koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const indexRoutes = require('./routes/index');
const moviesRoutes = require('./routes/movies');
const fs = require('fs');
const app = new koa();
const PORT = 1337;

app.use(bodyParser())
app.use(indexRoutes.routes());
app.use(moviesRoutes.routes());

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

