<template>
    <div id="page-wrapper">
        <h3>订单列表</h3>
        <hr>
        <form class="form-inline">
            <div class="form-group">
                <input class="form-control" name="keyword" type="search" v-model="condition.keyword" placeholder="输入手机号/姓名">
            </div>
            <div class="form-group">
                <label for="begin">开始日期</label>
                <input class="form-control" id="begin" name="begin" type="date" v-model="condition.begin">
            </div>
            <div class="form-group">
                <label for="end">结束日期</label>
                <input class="form-control" id="end" name="end" type="date" v-model="condition.end">
            </div>
            <button class="btn btn-primary btn-sm" @click="onSearch()">
                <i class="glyphicon glyphicon-search"></i>
            </button>
        </form>
    
        <table class="table tabler-hover">
            <thead>
                <tr>
                    <th>订单编号</th>
                    <th>订单信息</th>
                    <th>创建时间</th>
                    <th>订单状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders">
                    <td>{{order.Id}}</td>
                    <td>
                        <p v-for="product in order.Products">
                            {{product.Name}}
                            <span class="red">￥{{product.Price}}</span> &nbsp; X &nbsp;{{product.Count}} {{product.UnitName}} 小计：
                            <span class="red">￥{{product.cost}}</span>
                        </p>
                        <p class="red">总计：￥{{order.total}}
                            <span v-if="order.DeliveryCharge>0">含￥5运费</span>
                        </p>
                        <p>
                            <i class="glyphicon glyphicon-map-marker blue"></i> {{order.Street}}</p>
                        <p>
                            <i class="glyphicon glyphicon-user blue"></i>{{order.Name}}</p>
                        <p>
                            <i class="glyphicon glyphicon-phone blue"></i>{{order.Phone}}</p>
                    </td>
                    <td>{{order.CreateTime | mydate }}</td>
                    <td>{{order.State | orderstate}}</td>
                    <td>
                        <i class="glyphicon glyphicon-send" role="button" @click="onSend(order)" v-if="order.State==0"></i>
                        <i class="glyphicon glyphicon-remove operator" data-target="#cancelReason" data-toggle="modal" role="button" @click="onCancelOrder(order)" v-if="order.State==0||order.State==1"></i>
                        <i class="glyphicon glyphicon-ok operator" role="button" @click="onComplete(order)" v-if="order.State==0||order.State==1"></i>
                        <i class="glyphicon glyphicon-trash operator" role="button" @click="onRemoveOrder(order)"></i>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" id="cancelReason">
            <div class="jumbotron">
                <form>
                    <div class="form-group">
                        <label for="reason">取消原因</label>
                        <textarea class="form-control" id="creason" name="creason" v-model="reason" rows="3"></textarea>
                    </div>
                    <button class="btn btn-primary" data-target="#cancelReason" data-toggle="modal" @click="onSubmitCancel()">提交</button>
                </form>
            </div>
        </div>
        <ul class="pagination pagerbottom" v-if="pages.length>0">
            <li [class.disabled]="index<=1">
                <a @click="onPrev()">&laquo;</a>
            </li>
            <li v-for="page in pages" :class="{active:page==index}">
                <a @click="onPageClick(page)">{{page}}</a>
            </li>
            <li [class.disabled]="index*20>=count">
                <a @click="onNext()">&raquo;</a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            condition: {},
            orders: [],
            reason: '超出配送范围，谢谢关注。',
            pages: [],
            index: 1,
            count: 0,
            currOrder: {}
        }
    },
    methods: {
        onSearch() { },
        onSend(order) { },
        onCancelOrder(order) { },
        onComplete(order) { },
        onRemoveOrder(order) { },
        onSubmitCancel() { },
        onPrev() { },
        onNext() { },
        onPageClick(page) { }
    }
}
</script>
