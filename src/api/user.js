// 这个文件专门用于处理与users表相关的业务
// 1.引入axios
import axios from '@/utils/myaxios.js'

// 2. 实现登陆验证
export const userLogin = (data) => {
  // axios({})返回是一个promise对象
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

// 3.获取用户详情
export const getUserInfo = (id) => {
  return axios({
    // 我们当前所请求的api是需要授权的api,所以要根据后台的要求传入用户状态
    // 这个状态需要根据后台的严格要求进行传递
    // 后台要求使用：Authorization做为键,token做为值
    // headers: {
    //   Authorization: localStorage.getItem('heima_40_token')
    // },
    url: `/user/${id}`
  })
}
// 编辑用户信息
export const editUser = (id, data) => {
  return axios({
    url: `/user_update/${id}`,
    method: 'post',
    data
  })
}

// 注册账号
export const registerUser = (data) => {
  return axios({
    url: '/register',
    method: 'post',
    data
  })
}
// 关注用户
export const followUser = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}
// 取消关注
export const unFollowUser = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}
// 我的关注列表数据
export const getAttention = () => {
  return axios({
    url: '/user_follows'
  })
}
// 我的收藏列表数据
export const getCollect = () => {
  return axios({
    url: '/user_star'
  })
}
