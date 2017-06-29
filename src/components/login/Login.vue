<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">请登录</h3>
                    </div>
                    <div class="panel-body">
                        <form role="form">
                            <fieldset>
                                <div class="form-group">
                                    <input class="form-control" id="uname" name="uname" type="text" v-model="userName" required placeholder="用户名">
                                    <!--<p class="error" *ngIf="usernameInp.touched && !usernameInp.valid">用户名不能空</p>-->
                                </div>
                                <div class="form-group">
                                    <input class="form-control" id="pwd" name="pwd" type="password" v-model="password" required placeholder="密码">
                                    <!--<p class="error" *ngIf="passwordInp.touched && !passwordInp.valid">密码不能空</p>-->
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input name="remember" type="checkbox" value="remember" v-model="rememberPwd">记住密码
                                    </label>
                                </div>
                                <button class="btn btn-lg btn-success btn-block" @click="onLogin">登录</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userName: '',
            password: '',
            rememberPwd: ''
        }
    },
    methods: {
        onLogin() { }
    }
}
</script>
<style scoped>
.login-panel {
    margin-top: 25%;
}

.error {
    color: red;
    margin-top: 5px;
}
</style>

