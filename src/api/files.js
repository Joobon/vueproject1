// 这个文件专门处理文件上传
import axios from '@/utils/myaxios.js'

export const uploadFile = (data) => {
  return axios({
    url: '/upload',
    method: 'post',
    data
  })
}
