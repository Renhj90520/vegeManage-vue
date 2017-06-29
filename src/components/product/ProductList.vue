<template>
    <div id="page-wrapper">
        <h3>商品管理</h3>
        <hr>
        <div class="condition">
            <form class="form-inline">
                <div class="form-group">
                    <label for="pname">名称:</label>
                    <input class="form-control" id="pname" name="pname" type="text" v-model="condition.name">
                </div>
                <div class="form-group">
                    <label for="pcategroy">分类：</label>
                    <select class="form-control" id="pcategory" name="category" v-model="condition.category">
                        <option value="category.Id" v-for="category in categories">{{category.Name}}</option>
                    </select>
                </div>
                <button class="btn btn-primary btn-sm" @click="onSearch()">
                    <i class="glyphicon glyphicon-search"></i>
                </button>
                <button class="btn btn-primary btn-sm" @click="onClear()">清除</button>
                <button class="btn btn-primary right" @click="onAddProduct()">添加商品</button>
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
                        <select class="form-control" id="unit" name="unit" required @change="onUnitChange($event)" v-model="currProduct.UnitId">
                            <option value="unit.Id" v-for="unit in units">{{unit.Name}}</option>
                        </select>
                        <!--<p class="error" v-if="prodUnit.touched&&!prodUnit.valid">请选择商品单位！</p>-->
                    </div>
                    <div class="form-group">
                        <label for="category">分类</label>
                        <select class="form-control" id="category" name="category" required @change="onCateChange($event)" v-model="currProduct.CategoryId">
                            <option value="category.Id" v-for="category in categories">{{category.Name}}</option>
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
export default {
    data() {
        return {
            condition: {},
            categories: [],
            products: [],
            currProduct: {},
            units: [],
            pages: []
        }
    }
}
</script>
