<template>
  <section class="login-page">
        <Card dis-hover class="login-fram">
            <p slot="title">
                <Icon type="log-in"></Icon>
                欢迎登录
            </p>
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <Form-item prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="请输入用户名">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="请输入密码">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" long @click="handleSubmit('formInline')">登录</Button>
                </Form-item>
            </Form>
        </Card>
      </section>
  </section>
</template>
<script>
export default {
  data () {
        return {
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('提交成功!');
                    this.$router.push('/home')
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .login-page{
        width: 100%;
        height: 100%;
        position: relative;
        background: url('../assets/login/login_bg.jpg') no-repeat;
        .login-fram{
            width: 300px;
            position: absolute;
            background: #fff;
            border: 1px solid #cccccc;
            z-index: 999;
            right:160px;
            top: 50%;
            transform: translateY(-60%);
            border-radius:5px;
            .login-title{
                height: 20px;
                line-height: 20px;
                padding: 14px 16px;
                border-bottom: 1px solid #cccccc;
            }
        }
    }
</style>
