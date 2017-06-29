<template>
    <div id="page-wrapper">
        <form>
            <fieldset>
                <div class="form-group">
                    <div class="col-sm-8 nopadding">
                        <label for="prodName">名称</label>
                        <input class="form-control" id="prodName" name="prodName" type="text" required v-model="newProduct.Name">
                        <!--<p class="error" v-if="name.touched&&!name.valid">请输入商品名称！</p>-->
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-8 nopadding">
                        <label for="count">数量</label>
                        <input class="form-control" id="count" name="count" type="number" required v-model="newProduct.TotalCount">
                        <!--<p class="error" v-if="prodCount.touched&&!prodCount.valid">请输入数量！</p>-->
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-8 nopadding">
                        <label for="unit">单位</label>
                        <select class="form-control" id="unit" name="unit" required @change="onUnitChange($event)" v-model="newProduct.UnitId">
                            <option v-model="unit.Id" v-for="unit in units">{{unit.Name}}</option>
                        </select>
                        <!--<p class="error" v-if="prodUnit.touched&&!prodUnit.valid">请选择商品单位！</p>-->
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-8 nopadding">
                        <label for="category">分类</label>
                        <select class="form-control" id="category" name="category" required @change="onCateChange($event)" v-model="newProduct.CategoryId">
                            <option v-model="category.Id" v-for="category in categories">{{category.Name}}</option>
                        </select>
                        <!--<p class="error" v-if="prodCate.touched&&!prodCate.valid">请选择商品分类！</p>-->
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-8 nopadding">
                        <label for="price">价格</label>
                        <input class="form-control" id="price" name="price" type="number" required v-model="newProduct.Price">
                        <!--<p class="error" v-if="prodPrice.touched&&!prodPrice.valid">请输入价格！</p>-->
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-8 nopadding">
                        <label for="description">描述</label>
                        <input class="form-control" id="description" name="description" type="textarea" required rows="3" v-model="newProduct.Description">
                        <!--<p class="error" v-if="prodDesc.touched&&!prodDesc.valid">请输入描述！</p>-->
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-8 nopadding">
                        <label for="upload">选择图片</label>
                        <vue-file-upload :url="uploadUrl" name="upload" :events="cbEvents" :filters="filters" :request-options="reqopts" @onAdd="onAddItem"></vue-file-upload>
                    </div>
                </div>
            </fieldset>
            <div class="pictures row">
                <div class="col-sm-4" v-for="(pic,ii) in newProduct.Pictures">
                    <img class=" uploadPic " :src="pic.Path">
                    <button class="btn btn-danger btn-xs " @click="onPicedRemove(pic)">删除</button>
                </div>
                <div class="col-sm-4 " v-for="(item,i) in files">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" v-if="item " :style="{ 'width':item.progress+ '%'} "></div>
                    </div>
                    <button class="btn btn-xs btn-primary " @click="item.upload() " :disabled="item.isReady || item.isUploading || item.isSuccess ">
                        <i class="glyphicon glyphicon-upload "></i>上传</button>
                    <button class="btn btn-xs btn-danger " @click="onPicRemove(i) ">
                        <i class="glyphicon glyphicon-trash "></i>删除</button>
                </div>
            </div>
            <button class="btn btn-primary " style="margin-top:10px; " @click="onSubmit">提交</button>
        </form>
    </div>
</template>
<script>
import VueFileUpload from 'vue-file-upload'
import { baseUrl } from '../shared/settings.js'
export default {
    components: {
        VueFileUpload
    },
    data() {
        return {
            newProduct: {},
            units: [],
            categories: [],
            uploadUrl: baseUrl + 'upload',
            files: [],
            //文件过滤器，只能上传图片
            filters: [
                {
                    name: "imageFilter",
                    fn(file) {
                        var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                    }
                }
            ],
            //回调函数绑定
            cbEvents: {
                onCompleteUpload: (file, response, status, header) => {
                    if (response.state == 1) {
                        if (!this.newProduct.Pictures) {
                            this.newProduct.Pictures = []
                        }
                        this.newProduct.Pictures.push(response.body.Path);
                        this.files.splice(file, 1)
                    }
                }
            },
            //xhr请求附带参数
            reqopts: {
                responseType: 'json',
                withCredentials: false
            }
        }
    },
    methods: {
        onUnitChange(unit) { },
        onCateChange(cate) { },
        onSubmit() { }, onStatus(file) {
            if (file.isSuccess) {
                return "上传成功";
            } else if (file.isError) {
                return "上传失败";
            } else if (file.isUploading) {
                return "正在上传";
            } else {
                return "待上传";
            }
        },
        onAddItem(files) {
            this.files = files;
        },
        uploadItem(file) {
            //单个文件上传
            file.upload();
        },
        uploadAll() {
            //上传所有文件
            this.$refs.vueFileUploader.uploadAll();
        },
        clearAll() {
            //清空所有文件
            this.$refs.vueFileUploader.clearAll();
        }
    }
}
</script>
