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
            <li :class="{disabled:index<=1}">
                <a @click="onPrev()">&laquo;</a>
            </li>
            <li v-for="page in pages" :class="{active:page==index}">
                <a @click="onPageClick(page)">{{page}}</a>
            </li>
            <li :class="{disabled:index*20>=count}">
                <a @click="onNext()">&raquo;</a>
            </li>
        </ul>
    </div>
</template>
<script>
import { baseUrl } from '../shared/settings.js'
import axios from 'axios'
var utils = require('../shared/utils.js')
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
    created() {
        this.doLoading()
    },
    methods: {
        onSearch() {
            this.index = 1;
            this.doLoading()
        },
        onSend(order) {
            axios.put(baseUrl + 'orders/' + order.Id, { State: 1 }).then(res => {
                if (res.data.state == 1) {
                    order.State = 1;
                } else {
                    alert(res.data.message)
                }
            })
        },
        onCancelOrder(order) {
            this.currOrder = order
        },
        onComplete(order) {
            let finishTime = new Date();
            axios.put(baseUrl + 'orders/' + order.Id, { State: 3, FinishTime: finishTime })
                .then(res => {
                    if (res.data.state == 1) {
                        order.State = 3
                        order.FinishTime = finishTime
                    } else {
                        alert(res.data.message)
                    }
                })
        },
        onRemoveOrder(order) {
            if (confirm('确认删除该订单吗？')) {
                axios.delete(baseUrl + 'orders/' + oreder.Id)
                    .then(res => {
                        if (res.data.state == 1) {
                            this.orders.splice(order, 1)
                        } else {
                            alert(res.data.message)
                        }
                    })
            }
        },
        onSubmitCancel() {
            let cancelTime = new Date();
            axios.put(baseUrl + 'orders/' + order.Id, { State: 2, CancelReason: this.reason, CancelTime: cancelTime })
                .then(res => {
                    if (res.data.state == 1) {
                        order.State = 2
                        order.CancelReason = this.reason
                        order.CancelTime = cancelTime
                    } else {
                        alert(res.data.message)
                    }
                })
        },
        onPrev() {
            if (this.index <= 1)
                return
            this.index--
            this.doLoading()
        },
        onNext() {
            if ((this.index * 10) >= this.count) {
                return
            }
            this.index++
            this.doLoading()
        },
        onPageClick(page) {
            this.index = page
            this.doLoading()
        },
        doLoading() {
            let url = baseUrl + 'orders'
            var params = { index: this.index, perPage: 10 }
            if (this.condition.keyword) {
                params.keyword = condition.keyword
            }
            if (this.condition.begin) {
                params.begin = condition.begin
            }
            if (this.condition.end) {
                params.end = condition.end
            }
            params.noshowRemove = true;

            axios.get(url, { params: params })
                .then(res => {
                    if (res.data.state == 1) {
                        this.count = res.data.body.count
                        this.orders = res.data.body.items
                        this.orders.forEach(order => {
                            let total = order.Products.map(p => utils.mutiple(p.Price, p.Count)).reduce((x, y) => utils.add(x, y));
                            order.total = utils.add(total, order.DeliveryCharge);
                            order.Products.forEach(p => {
                                p.cost = utils.mutiple(p.Count, p.Price);
                            });

                        })
                        let pager = utils.getPager(this.count, this.index, 10)
                        this.pages = pager.pages
                    }
                })
        }
    }
}
</script>
