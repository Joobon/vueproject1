
// 这个文件主要用于处理与新闻相关的业务
// 1.引入axios
import axios from '@/utils/myaxios.js'

// 2. 获取指定栏目的所有新闻数据
export const getArticleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
// 3.文章详情
export const getNewsMain = (id) => {
  return axios({
    url: `/post/${id}`
  })
}
// 点赞文章
export const zanNews = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}
// 收藏文章
export const saveNew = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}
// 评论列表
export const getComment = (id) => {
  return axios({
    url: `/post_comment/${id}`
  })
}
// 发布评论
export const sendComment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}
