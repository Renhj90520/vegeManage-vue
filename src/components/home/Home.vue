<template>
    <div class="container-fluid">
        <nav class="narbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button class="navbar-toggle collapsed" data-target=".navbar-collapse" data-toggle="collapse" type="button">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">后台管理</a>
                </div>
                <ul class="nav navbar-nav navbar-right navbar-collapse collapse">
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i class="glyphicon glyphicon-user"></i> &nbsp;
                            <i class="glyphicon glyphicon-triangle-bottom"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a @click="onLogout" style="cursor:pointer">
                                    <i class="glyphicon glyphicon-log-out"></i> &nbsp;注销</a>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="navbar-default navbar-collapse sidebar collapse" role="navigation">
                    <div>
                        <ul class="nav">
                            <router-link tag="li" to="/orderlist">
                                <a>
                                    <i class="glyphicon glyphicon-list-alt"></i> 订单管理</a>
                            </router-link>
                            <router-link tag="li" to="/productlist">
                                <a>商品列表</a>
                            </router-link>
                            <router-link tag="li" to="/product">
                                <a>添加商品</a>
                            </router-link>
                            <router-link tag="li" to="/unit">
                                <a>单位管理</a>
                            </router-link>
                            <router-link tag="li" to="/category">
                                <a>商品分类管理</a>
                            </router-link>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>
<script>
$(document).ready(function () {
    $('.nav a').click(function () {
        $('.navbar-collapse').collapse('hide');
    });
});
export default {
    methods: {
        onLogout() { }
    }
}
</script>
