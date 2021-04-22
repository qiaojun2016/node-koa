
const client_id = "oMj1mHkAmqCEPyN7a4zf905B"
const client_secret = "WWpiv7yjXH1I6A2IuDQQMd6BpAI4LdyL"
const base_url = "https://aip.baidubce.com/rest/2.0/ocr/v1/"
const auth_url = "https://aip.baidubce.com/oauth/2.0/token"
// 标准ocr识别
const general_basic = "general_basic"

/**
 * 获取ocr  token
 * @returns 
 */
const getAccessToken = async () => {
    return (await axios.get(`${AuthUrl}?grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}&`)).data
}



/**
 * 标准识别
 * @param {} base64Image 
 * @param {*} access_token 
 * @returns 
 */
const getGeneralBasic = async (base64Image, access_token) =>  {
    try {
        var response = await axios({
            method: 'post',
            url: `${base_url}${general_basic}?access_token=${access_token}`,
            data: qs.stringify({
              image: base64Image,
              detect_direction: true,
            }),
            headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          })

         console.log(response.data)
          
    } catch(error) {
        console.log(error)
        return {
            status: 'failure',
            error: error,
        }
    }
}




