<template>
    <div id="page-wrapper">
        <h3>商品管理</h3>
        <hr>
        <div class="conditions">
            <form class="form-inline">
                <div class="form-group">
                    <label for="pname">名称:</label>
                    <input class="form-control" id="pname" name="pname" type="text" v-model="conditions.name">
                </div>
                <div class="form-group">
                    <label for="pcategroy">分类：</label>
                    <select class="form-control" id="pcategory" name="category" v-model="conditions.category">
                        <option value="category.Id" v-for="category in categories">{{category.Name}}</option>
                    </select>
                </div>
                <button class="btn btn-primary btn-sm" @click.prevent="onSearch()">
                    <i class="glyphicon glyphicon-search"></i>
                </button>
                <button class="btn btn-primary btn-sm" @click.prevent="onClear()">清除</button>
                <button class="btn btn-primary right" @click.prevent="onAddProduct()">添加商品</button>
            </form>
        </div>
        <hr class="clear">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>名称</th>
                    <th>价格</th>
                    <th>单位</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products">
                    <td>{{product.Name}}</td>
                    <td>{{product.Price}}</td>
                    <td>{{product.UnitName}}</td>
                    <td>
                        <i class="glyphicon glyphicon-edit operator" @click="onEdit(product)"></i>
                        <i class="glyphicon glyphicon-trash operator" @click="onDelete(product)"></i>
                        <i class="glyphicon glyphicon-pencil operator" data-target="#proedit" data-toggle="modal" @click="onQuickEdit(product)"></i>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" id="proedit">
            <div class="jumbotron">
                <form method="post">
                    <div class="form-group">
                        <label for="prodName">名称</label>
                        <input class="form-control" id="prodName" name="prodName" type="text" required v-model="currProduct.Name">
                        <!--<p class="error" v-if="name.touched&&!name.valid">请输入商品名称！</p>-->
                    </div>
                    <div class="form-group">
                        <label for="unit">单位</label>
                        <select class="form-control" id="unit" name="unit" required @change="onUnitChange" v-model="currProduct.UnitId">
                            <option :value="unit.Id" v-for="unit in units">{{unit.Name}}</option>
                        </select>
                        <!--<p class="error" v-if="prodUnit.touched&&!prodUnit.valid">请选择商品单位！</p>-->
                    </div>
                    <div class="form-group">
                        <label for="category">分类</label>
                        <select class="form-control" id="category" name="category" required v-model="currProduct.CategoryId">
                            <option :value="category.Id" v-for="category in categories">{{category.Name}}</option>
                        </select>
                        <!--<p class="error" v-if="prodCate.touched&&!prodCate.valid">请选择商品分类！</p>-->
                    </div>
                    <div class="form-group">
                        <label for="price">价格</label>
                        <input class="form-control" id="price" name="price" type="number" required v-model="currProduct.Price">
                        <!--<p class="error" v-if="prodPrice.touched&&!prodPrice.valid">请输入价格！</p>-->
                    </div>
                    <button class="btn btn-primary" data-target="#proedit" data-toggle="modal" type="submit" @click="onSubmit()">修改</button>
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
            conditions: {},
            categories: [],
            products: [],
            currProduct: {},
            units: [],
            pages: [],
            index: 1,
            count: 0,
            pages: []
        }
    },
    created() {
        axios.get(baseUrl + 'categories')
            .then(res => {
                if (res.data.state == 1) {
                    this.categories = res.data.body
                } else {
                    alert(res.data.message)
                }
            })

        axios.get(baseUrl + 'units')
            .then(res => {
                if (res.data.state == 1) {
                    this.units = res.data.body
                } else {
                    alert(res.data.message)
                }
            })
        this.doLoading()
    },
    methods: {
        onSearch() {
            this.index = 1
            this.doLoading()
        },
        onPrev() {
            if (this.index <= 1) {
                return
            }
            this.index--
            this.doLoading()
        },
        onPageClick(page) {
            this.index = page
            this.doLoading()
        },
        onNext() {
            if (this.index * 20 >= this.count)
                return
            this.index++
            this.doLoading()
        },
        onAddProduct() {
            this.$router.push('/product')
        },
        onEdit(product) {
            this.$router.push('/productlist/' + product.Id)
        },
        onDelete(product) {
            axios.put(baseUrl + 'products/' + product.Id, { State: 0 })
                .then(res => {
                    if (res.data.state == 1) {
                        this.products.splice(this.products.indexOf(product), 1)
                    } else {
                        alert(res.data.message)
                    }
                })
        },
        onClear() {
            this.condition = {}
            this.onSearch()
        },
        onQuickEdit(product) {
            this.currProduct = product
        },
        onUnitChange() {
            let unit = this.units.find(u => { return u.Id == this.currProduct.UnitId })
            this.currProduct.UnitName = unit.name
            this.currProduct.Step = unit.Step
        },
        onSubmit() {
            axios.put(baseUrl + 'products/' + this.currProduct.Id, this.currProduct)
                .then(res => {
                    if (res.data.state == 1) {
                        alert('修改成功')
                        this.currProduct = {}
                    }
                })
        },
        doLoading() {
            let url = baseUrl + 'products'
            var conditions = []
            conditions.push('index=' + this.index)
            conditions.push('perPage=' + 20)
            if (this.condition) {
                if (this.condition.category && this.condition.category != 0) {
                    conditions.push('category=' + this.condition.category)
                }
                if (condition.name) {
                    conditions.push('name=' + this.condition.name)
                }
            }
            url += '?' + conditions.join('&')
            axios.get(url)
                .then(res => {
                    if (res.data.state == 1) {
                        this.products = res.data.body.items
                        this.count = res.data.body.count
                        let pager = utils.getPager(this.count, this.index, 20)
                        this.pages = pager.pages
                    }
                })
        }
    }
}
</script>
