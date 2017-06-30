<template>
    <div id="page-wrapper">
        <h3>单位管理</h3>
        <div>
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>增长数量</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(unit,i) in units">
                        <td>{{unit.Name}}</td>
                        <td>{{unit.Step}}</td>
                        <td>
                            <i class="glyphicon glyphicon-edit operator" @click="onEdit(i)"></i>
                            <i class="glyphicon glyphicon-remove operator" @click="onRemove(i)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="bottom">
            <form class="form-inline">
                <div class="form-group">
                    <label for="unitname">名称</label>
                    <input class="form-control" id="unitname" name="unitname" v-model="currUnit.Name" type="text">
                </div>
                <div class="form-group">
                    <label for="unitstep">增长数量</label>
                    <input class="form-control" id="unitstep" name="unitstep" step="0.1" v-model="currUnit.Step" type="number">
                </div>
                <button class="btn btn-primary" type="submit" @click.prevent="onAddUnit()" v-if="!currUnit.Id">添加</button>
                <button class="btn btn-primary" type="submit" @click.prevent="onAddUnit()" v-if="currUnit.Id">更新</button>
            </form>
        </div>
    
    </div>
</template>
<script>
import { baseUrl } from '../shared/settings.js'
import axios from 'axios'

export default {
    data() {
        return {
            units: [],
            currUnit: {}
        }
    },
    created() {
        axios.get(baseUrl + 'units')
            .then(res => {
                if (res.data.state == 1) {
                    this.units = res.data.body
                } else {
                    alert(res.data.message)
                }
            })
    },
    methods: {
        onEdit(index) {
            this.currUnit = this.units[index]
        },
        onRemove(index) {
            let id = this.units[index].Id
            axios.delete(baseUrl + 'units/' + id)
                .then(res => {
                    if (res.data.state == 1) {
                        this.units.splice(index, 1)
                    } else {
                        alert(res.data.message)
                    }
                })
        },
        onAddUnit() {
            if (this.currUnit.Id) {
                axios.put(baseUrl + 'units', this.currUnit)
                    .then(res => {
                        if (res.data.state == 1) {
                            this.currUnit = {}
                        } else {
                            alert(res.data.message)
                        }
                    })
            } else {
                axios.post(baseUrl + 'units', this.currUnit)
                    .then(res => {
                        if (res.data.state == 1) {
                            this.units.push(res.data.body)
                            this.currUnit = {}
                        } else {
                            alert(res.data.message)
                        }
                    })
            }
        }
    }
}
</script>
