import { observable, action } from 'mobx'
import axios from 'axios'

class Store {

    @action publicSetMethod = (key, val) => {
        this[key] = val
    }
}



const store = new Store()

export default store