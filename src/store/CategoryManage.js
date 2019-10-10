import { observable, action, runInAction } from 'mobx'
import axios from 'axios'

class Store {
    @observable drawerShow = false
    @observable categoryListData = []
    @action CategoryAdd = (params) => {
        axios.post('/api/category/add', params)
            .then(res => {
                if (res.data.code == 0) {
                    this.loadCategoryList()
                }
            })
    }
    @action loadCategoryList = () => {
        axios.get('/api/category/list').then(res => {
            // console.log(res.data)
            if (res.data.code == 0) {
                runInAction(() => {
                    this.categoryListData = res.data.doc
                })
            }
        })
    }
    @action categoryItemDel = (id) => {
        axios.post("/api/category/del", { _id: id }).then(res => {
            if (res.data.code == 0) {
                this.loadCategoryList()
            }
        })
    }
    @action publicSetMethod = (key, val) => {
        this[key] = val
    }
}
const store = new Store()
export default store