const Router = require('koa-router')
const axios = require('axios');
const router = new Router();
const fs = require('fs')
const path = require('path')

/**
 * 百度 ocr 客户端初始化
 */
var AipOcrClient = require("baidu-aip-sdk").ocr;

// 设置APPID/AK/SK
var APP_ID = "24034099";
var API_KEY = "mWotFfB5OUIKbZlg52j2fTO4";
var SECRET_KEY = "4loTowzZGOvrrD4GY4esOlr1i44hwIBo";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
/*
var image = fs.readFileSync(path.resolve(__dirname, "example1.jpg")).toString("base64");
client.generalBasic(image).then(function (result) {
  console.log(JSON.stringify(result));
}).catch(function (err) {
  // 如果发生网络错误
  console.log(err);
});
*/

/****百度ocr  end */
const BASE_URL = `/api/v1/ocr`


router.get(BASE_URL, async (ctx) => {
  try {
    var response = await axios.get('https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=oMj1mHkAmqCEPyN7a4zf905B&client_secret=WWpiv7yjXH1I6A2IuDQQMd6BpAI4LdyL&')
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  }
})



router.post(`${BASE_URL}/general_basic`, async (ctx) => {
  const data  = await client.accurateBasic(ctx.request.body.image)
  console.log(data);
  var code = ocrResParse(data, (word) => {
    word = word.toUpperCase()
    var p = /[F|Y][0-9]{10}/i;
    var res = word.match(p)
    if (res && res.length > 0) return res[0]
    else return undefined
  })
  console.log("水洗唛: " + code)

  // 返回结果
  if (code != null) {
    ctx.body = {
      status: "success",
      data: {
        code
      }
   }
  } else {
    ctx.body = {
      status: "failure",
      error: "照片模糊无法识别"
   }
  }
})


function ocrResParse(ocrRes, match) {
  if (ocrRes && ocrRes.words_result) {
    const result = ocrRes.words_result
    .filter(w => match(w.words) != undefined)
    .map(w => match(w.words))
    return result[0]
  } else {
    return null;
  }
}
module.exports = router;