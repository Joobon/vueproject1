// 这个文件用来处理栏目相关业务
import axios from '@/utils/myaxios.js'

export const getCategory = () => {
  return axios({
    url: '/category'
  })
}
