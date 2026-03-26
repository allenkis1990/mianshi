<template>
  <div class="login-box">
    <div class="loginFrame">
      <div class="main-text">密码登录</div>
      <div class="login-main">
        <div class="login-ipt account-main">
          <div class="ipt-ico ico-phone"></div>
          <input type="text"
                 v-model="model.username"
                 class="ipt"
                 placeholder="请输入账号">
        </div>
        <div class="login-ipt pwd-main">
          <div class="ipt-ico ico-eye"></div>
          <input type="password"
                 v-model="model.password"
                 class="ipt"
                 placeholder="请输入密码">
        </div>
        <div class="btn btn-orange btn-login" @click="login">登录</div>
      </div>
    </div>
  </div>

</template>
<script setup>
import modal from '@src/js/utils/modal'
import http from '@src/js/utils/http'
const emit = defineEmits(['loginSuccess']);

let model = reactive({
  username: '',
  password: ''
})

onMounted(async ()=>{

})


function login(){
  let phone = model.username.replace(/\s+/ig,'')
  let password = model.password.replace(/^\s+/ig,'').replace(/\s+$/ig,'')
  if (!phone) {
    modal.msgWarning("请输入账号");
    return
  }
  if (!password) {
    modal.msgWarning("请输入密码");
    return
  }
  http.httpPost('/teacher-ding-talk/login',{
    password: http.encryptStr(model.password).toUpperCase(),
    username: model.username
  }).then(async (res)=>{
    let {error_code,data} = res
    if(!error_code){
      emit('loginSuccess')
      modal.msgSuccess('登录成功！')
      await chrome.storage.local.set({token: res.data.token})
    }
  })
}
</script>
<style lang="scss" scoped>
.login-box{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginFrame{
    border-radius: 10px;
    width: 600px;
    height: 385px;
    background: #fff;
    padding: 45px 40px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .main-text{
      font-size: 30px;
      text-align: center;
      margin-bottom: 30px;
    }
    .login-tab{
      width: 100%;
      height: 60px;
      background: #F8F9FA;
      border-radius: 10px 10px 10px 10px;
      padding: 0 8px;
      display: flex;
      align-items: center;
      margin-bottom: 40px;
      .login-tab-item{
        width: 50%;
        height: 50px;
        font-size: 16px;
        color:#909399;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &.cur{
          background: #ffffff;
          box-shadow: 0 2px 6px 0 rgba(0,0,0,0.1);
          border-radius: 10px;
          color: #303133;
        }
      }
    }
    .login-main{
      .login-ipt{
        width: 100%;
        height: 50px;
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid #DCDFE6;
        display: flex;
        align-items: center;
        padding: 0 12px;
        .ipt-ico{
          width: 22px;
          height: 22px;
          &.ico-phone{
            background: url("@src/images/ico-phone.png") no-repeat center center;
            background-size: 17px 20px;
            margin-top: -2px;
          }
          &.ico-eye{
            background: url("@src/images/ico-eye.png") no-repeat center center;
            background-size: 22px 22px;
            margin-top: -2px;
          }
        }
        .ipt{
          font-size: 16px;
          color: #909399;
          margin-left: 5px;
          border: none;
          outline: none;
          &::placeholder{
            color: #909399;
            font-size: 16px;
          }
        }
      }
      .account-main{
        margin-bottom: 40px;
      }
      .pwd-main{
        margin-bottom: 28px;
      }
      .vercode-main{
        margin-bottom: 28px;
        display: flex;
        flex-wrap: wrap;
        .login-ipt{
          flex: 1;
        }
        .btn-vercode{
          font-size: 16px;
          min-width: 114px;
          width: 114px;
          margin-left: 16px;
          &.sendCodeDisabled{
            background: #F5F7FA;
            color: #C0C4CC;
            cursor: not-allowed;
          }
        }
      }
      .login-tip-text,{
        font-size: 12px;
        color: #909399;
        letter-spacing: 1px;
        margin-bottom: 10px;
        margin-top: 24px;
      }
      .agreement-box{
        font-size: 12px;
        color: #909399;
        letter-spacing: 1px;
        a{
          color: #347BFF;
          text-decoration: none;
          ins{
            text-decoration: none;
            &:hover{
              text-decoration: underline;
            }
          }
        }
        .login-checkbox{
          margin-right: 5px;
          vertical-align: -2px;
        }
      }
    }
  }
  .btn{
    width: 100%;
    height: 50px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color:#ffffff;
    font-size: 18px;
    cursor: pointer;
  }
  .btn-orange{
    background: #FF7F00;
  }
}
</style>
