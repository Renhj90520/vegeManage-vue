<template>
    <div id="page-wrapper">
        <h3>商品分类管理</h3>
        <table class="table table-hover table-bordered table-responsive">
            <thead>
                <tr>
                    <th>分类名称</th>
                    <th>图标路径</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in categories">
                    <td>{{category.Name}}</td>
                    <td>{{category.IconPath}}</td>
                    <td>
                        <i class="glyphicon glyphicon-edit operator" role="button" @click="onEdit(category)"></i>
                        <i class="glyphicon glyphicon-remove" role="button" @click="onRemove(category)"></i>
                    </td>
                </tr>
            </tbody>
        </table>
        <form class="form-inline bottom">
            <div class="form-group">
                <label for="cateName">名称</label>
                <input class="form-control" id="cateName" name="cateName" v-model="currCategory.Name" type="text">
            </div>
            <div class="form-group">
                <label for="upload">选择图标</label>
                <vue-file-upload name="upload" :url="uploadUrl" :events="cbEvents" :filters="filters" :request-options="reqopts" @onAdd="onAddItem"></vue-file-upload>
                <!--<input type="file" ng2FileSelect [uploader]="uploader" (change)="selectFileOnChanged($event)">-->
            </div>
            <div class="form-group">
                <div v-if="currCategory.IconPath">
                    <img :src="currCategory.IconPath" alt="" class="uploadPic">
                    <button class="btn btn-danger btn-xs" @click="onPicRemove()">删除</button>
                </div>
                <div v-for="item in files">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" v-if="item" :style="{'width':item.progress+'%'}"></div>
                    </div>
                    <button class="btn btn-xs btn-primary" @click="item.upload()" :disabled="item.isReady || item.isUploading || item.isSuccess">
                        <i class="glyphicon glyphicon-upload"></i>上传</button>
                    <button class="btn btn-xs btn-danger" @click="item.remove()">
                        <i class="glyphicon glyphicon-trash"></i>删除</button>
                </div>
            </div>
            <button class="btn btn-primary" @click="onSubmit()" v-if="!currCategory.Id">添加</button>
            <button class="btn btn-primary" @click="onUpdate()" v-if="currCategory.Id">更新</button>
        </form>
    </div>
</template>
<script>
import VueFileUpload from 'vue-file-upload'
// import { baseUrl } from '../shared/settings'
export default {
    components: {
        VueFileUpload
    },
    data() {
        return {
            categories: [],
            currCategory: {},
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
                        this.currCategory.IconPath = response.body.Path;
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
        onStatus(file) {
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

