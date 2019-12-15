<template>
  <div class="edit">
    <topheard topt="编辑个人资料">
      <span slot="left" class="iconfont iconjiantou2 fanhui" @click="fback">返回</span>
      <span slot="right" @click='outl'>退出</span>
    </topheard>
    <div class="head">
      <img :src="dataobj.head_img" alt />
      <van-uploader :after-read="afterRead" />
    </div>
    <mycell title="昵称" :dis="dataobj.nickname" @click="show=!show"></mycell>
    <van-dialog v-model="show" title="标题" show-cancel-button @confirm="upNickname">
      <van-field
        :value="dataobj.nickname"
        required
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
        ref="nickname"
      />
    </van-dialog>
    <mycell title="密码" dis="*******" @click="show1=!show1"></mycell>
    <van-dialog v-model="show1" title="标题" show-cancel-button @confirm="upPassword" :beforeClose='beforeClose'>
      <van-field
        required
        label="原密码"
        placeholder="请输入原密码"
        ref="oldpwd"
      />
      <van-field
        required
        label="新密码"
        placeholder="请输入新密码"
        ref="newpwd"
      />
    </van-dialog>
    <mycell title="性别" :dis="dataobj.gender=== 1?'男':'女'" @click="show2=!show2"></mycell>
    <van-dialog v-model="show2" title="标题" show-cancel-button @confirm="upGender">
      <!-- Picker 选择器 vant组件 -->
      <van-picker :columns="columns" @change="onChange" />
    </van-dialog>
  </div>
</template>

<script>
import topheard from '../components/topheard.vue'
import mycell from '@/components/mycell.vue'
import { uploadFile } from '@/api/files.js'
import { editUser, getUserInfo } from '@/api/user.js'
export default {
  data () {
    return {
      id: '',
      dataobj: {},
      show: false,
      show1: false,
      show2: false,
      columns: ['女', '男'],
      genderIndex: ''
    }
  },
  components: {
    topheard,
    mycell
  },
  async mounted () {
    this.id = this.$route.params.id
    let res = await getUserInfo(this.id)
    if (res.data.message === '获取成功') {
      this.dataobj = res.data.data
      if (this.dataobj.head_img) {
        this.dataobj.head_img =
          localStorage.getItem('baseurl') + this.dataobj.head_img
      } else {
        this.dataobj.head_img =
          localStorage.getItem('baseurl') + '/uploads/image/123.jpeg'
      }
    } else {
      this.$toast.fail('获取用户信息失败，请重试')
    }
  },
  methods: {
    fback () {
      window.history.back()
    },
    // 退出
    outl () {
      localStorage.removeItem('heima_40_token')
      this.$router.push({ name: 'index' })
    },
    // 修改头像
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      // 1.file.file就是我们需要的文件资源数据
      // 2.包装为formdata
      let formdata = new FormData()
      formdata.append('file', file.file)
      // 3.发起异步请求实现文件上传
      let res = await uploadFile(formdata)
      if (res.data.message === '文件上传成功') {
        // 4.实现用户头像数据的更新
        // 让我们可以以同步的方式调用异步方法
        let res1 = await editUser(this.id, { head_img: res.data.data.url })
        console.log(res1)
        console.log(res)
        if (res1.data.message === '修改成功') {
          this.$toast.success('修改用户头像成功')
          // 为了即时刷新头像的显示
          this.dataobj.head_img =
            localStorage.getItem('baseurl') + res.data.data.url
        } else {
          this.$toast.fail('修改用户头像失败')
        }
      } else {
        this.$toast.fail('文件上传失败，请重试')
      }
    },
    // 修改昵称
    async upNickname () {
      let nickname = this.$refs.nickname.$refs.input.value
      let res1 = await editUser(this.id, { nickname: nickname })
      console.log(res1)
      if (res1.data.message === '修改成功') {
        this.$toast.success('修改昵称成功')
        // 为了即时刷新头像的显示
        this.dataobj.nickname = nickname
      } else {
        this.$toast.fail('修改昵称失败')
      }
    },
    // 修改密码
    async upPassword () {
      let oldpwd = this.$refs.oldpwd.$refs.input.value
      if (this.dataobj.password === oldpwd) {
        let newpwd = this.$refs.newpwd.$refs.input.value
        if (!/\w{3,16}/.test(newpwd)) {
          this.$toast.fail('请输入3-16位的密码格式')
          return
        }
        let res1 = await editUser(this.id, { password: newpwd })
        if (res1.data.message === '修改成功') {
          this.$toast.success('修改密码成功')
          // localStorage.removeItem('baseurl')
          localStorage.removeItem('heima_40_token')
          this.$router.push({ name: 'login' })
        }
      } else {
        this.$toast.fail('原密码输入错误')
      }
    },
    // 修改性别
    async upGender () {
      let res1 = await editUser(this.id, { gender: this.genderIndex })
      // console.log(res1)
      if (res1.data.message === '修改成功') {
        this.$toast.success('修改性别成功')
        // 为了即时刷新头像的显示
        this.dataobj.gender = this.genderIndex
      } else {
        this.$toast.fail('修改性别失败')
      }
    },
    onChange (picker, value, index) {
      // this.$toast(`当前值：${value}, 当前索引：${index}`)
      this.genderIndex = index
    },
    beforeClose (action, done) {
      let oldpwd = this.$refs.oldpwd.$refs.input.value
      let newpwd = this.$refs.newpwd.$refs.input.value
      if (action === 'confirm' && this.dataobj.password !== oldpwd) {
        this.$toast.fail('原密码不正确')
        done(false)
      } else if (action === 'confirm' && !/\w{3,16}/.test(newpwd)) {
        this.$toast.fail('请输入3-16位的密码格式')
        done(false)
      } else {
        done()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.edit {
  .fanhui {
    font-size: 15 * 100vw/360;
  }
  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: relative;

    .uploader {
      position: absolute;
      opacity: 0;
    }

    img {
      display: block;
      width: 100 / 360 * 100vw;
      height: 100 / 360 * 100vw;
      border-radius: 50%;
    }
    /deep/.van-uploader__upload {
      width: 100 / 360 * 100vw;
      height: 100 / 360 * 100vw;
    }
    /deep/.van-picker-column__item {
      border-top: 1px red sloid;
      border-bottom: 1px red sloid;
    }
    /deep/.van-uploader {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
  }
}
</style>
