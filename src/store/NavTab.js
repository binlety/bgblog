import { observable, action, toJS } from 'mobx'

class Store {
    @observable activeKey = '相册'
    @observable tabsPan = ["主菜单", '栏目管理','相册']

    @action addNavMenu = (key) => {
        if (this.tabsPan.indexOf(key) == -1) {
            this.tabsPan.push(key)
        }
        this.activeKey = key
    }
    @action removeNavMenu = (targetKey) => {
        const _index = this.tabsPan.indexOf(targetKey)
        this.tabsPan.splice(_index, 1)
        if (targetKey == this.activeKey) {
            if (_index == 0) {
                this.activeKey = this.tabsPan[_index]
            } else {
                this.activeKey = this.tabsPan[_index - 1]
            }
        }
    }

    @action publicSetMethodNav = (key, val) => {
        this[key] = val
    }
}

const store = new Store()

export default store