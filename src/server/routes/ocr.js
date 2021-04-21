const Router = require('koa-router')
const urlencode = require('urlencode');
const axios = require('axios');
const qs = require('qs')
const router = new Router();
const BASE_URL = `/api/v1/ocr`

const general_basic = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic"

const Key = "oMj1mHkAmqCEPyN7a4zf905B"
const SecretKey = "WWpiv7yjXH1I6A2IuDQQMd6BpAI4LdyL"


router.get(BASE_URL, async (ctx) => {
    try {
        var response = await axios.get('https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=oMj1mHkAmqCEPyN7a4zf905B&client_secret=WWpiv7yjXH1I6A2IuDQQMd6BpAI4LdyL&')
        console.log(response)
    } catch (error) {
        console.log(error)
    }
    ctx.body = {
        status: 'success',
        message: 'hello, world!'
    }
})



router.post(`${BASE_URL}/general_basic`, async (ctx) => {
    /*
    try {
        var response = await axios({
            method: 'post',
            url: `${general_basic}?access_token=24.4b9300e2779db61950181d1934fde733.2592000.1621576241.282335-24033894`,
            data: qs.stringify({
              image: ctx.request.body.image,
              detect_direction: true,
            }),
            headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          })

          const data = response.data
         // console.log(data)
          function match(word) {
            var p = /[F|Y][0-9]{10}/i;
            var res = word.match(p)
            if (res && res.length > 0) return res[0]
            else return undefined
          }

          if (data && data.words_result) {
              const result = data.words_result.filter(w => match(w.words) != undefined).map(w => match(w.words))
              ctx.body = {
                status: 'success',
                data:{
                    code: result[0]
                }
              }
          } else {
            ctx.body = {
                status: 'failure',
                error: "照片模糊无法被识别,请手动输入"
              }  
          }
          
    } catch(error) {
        console.log(error)
        ctx.body = {
            status: 'failure',
            error: error,
        }
    }
*/

    ctx.body = await generalBasicOcr(ctx.request.body.image, "24.4b9300e2779db61950181d1934fde733.2592000.1621576241.282335-24033894")

})



const GENERAL_BASIC = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic"

const generalBasicOcr = async (base64Image, access_token) =>  {
    try {
        var response = await axios({
            method: 'post',
            url: `${GENERAL_BASIC}?access_token=${access_token}`,
            data: qs.stringify({
              image: base64Image,
              detect_direction: true,
            }),
            headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          })

          const data = response.data
         console.log(data)
         // 匹配水洗唛
          function match(word) {
            var p = /[F|Y][0-9]{10}/i;
            var res = word.match(p)
            if (res && res.length > 0) return res[0]
            else return undefined
          }

          if (data && data.words_result) {
              const result = data.words_result.filter(w => match(w.words) != undefined).map(w => match(w.words))
              return {
                status: 'success',
                data:{
                    code: result[0]
                }
              }
          } else {
            return {
                status: 'failure',
                error: "照片模糊无法被识别,请手动输入"
              }  
          }
          
    } catch(error) {
        console.log(error)
        return {
            status: 'failure',
            error: error,
        }
    }
}

const GET_ACCESS_TOKEN = "https://aip.baidubce.com/oauth/2.0/token"
const  getAccessToken = async (client_id, client_secret) => {
   const { data } =  await axios.get(`${GET_ACCESS_TOKEN}?grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}&`)
}

module.exports = router;