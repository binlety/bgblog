import {
    observable,
    action,
    configure,
    runInAction,
    toJS
} from 'mobx';
configure({
    enforceActions: 'observed'
});
import axios from 'axios'

class Store {
    @observable imgArr = [1, 2, 3, 4, 2, 6, 3, 3, 5, 'ning', 2, 1, 6, 5, 4, 2, 5, 'zi', 1, 6, 3, 3, 5, 2, 4, 6]
    @observable screenW = 1314
    @observable imgW = 20
    @observable gap = 20
    @observable heightArr = []
    @action init = () => {
        // this.pubu();
        // setTimeout(() => {
        //     this.screenW = document.querySelectorAll("#box")[0].offsetWidth;
        //     this.paixu()
        // }, 2000);
        var box = document.querySelectorAll("#box")
        var items = document.querySelectorAll("#box>.item");
        var screenW = 1111; //获取屏幕的宽度
        var imgW = items[0].offsetWidth; //获取单个图片的宽度
        var gap = 20; //边距
        var heightArr = []; //定义数组用来存高度
        pubu();
        setTimeout(() => {
            screenW = box[0].offsetWidth;
            console.log(screenW)
            pubu();
            this.paixu()
        }, 2000);

        //每次屏幕大小改变的时候调用一次函数
        window.onresize = function () {
            pubu();
        };

        function pubu() {
            //获取屏幕的宽度,注意获取body的宽度，不要用视口的，因为视口的宽度是不会变的，
            var cols = Math.floor(screenW / (imgW + gap)); //动态设置每一行可以放的图片
            //循环遍历每个图片
            for (var i = 0; i < items.length; i++) {
                if (i < cols) {
                    //设置第一行的图片位置
                    var boxHeight = items[i].offsetHeight;
                    items[i].style.left = i * (imgW + gap) + "px";
                    items[i].style.top = 0 + "px";
                    heightArr[i] = boxHeight;
                } else {
                    //拿到最低高度和它的索引
                    var minH = Math.min.apply(Math.min, heightArr);
                    var index = heightArr.indexOf(minH);
                    //设置第二行的图片位置
                    items[i].style.left = index * (imgW + gap) + "px";
                    items[i].style.top = minH + gap + "px";
                }
                //每次设置一个图片的top后都要更新数组最低的高度
                // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
                heightArr[index] = heightArr[index] + items[i].offsetHeight + gap;
            }
        }
    }

    @action paixu = () => {
        setInterval(() => {
            var arr = [];
            const domArr = this.imgArr
            for (var i = 0, len = domArr.length; i < len; i++) {
                arr[i] = domArr[i];
            }
            const newarr = []
            while (arr && arr.length) {
                const ran = parseInt(Math.random() * arr.length)
                newarr.push(arr[ran])
                arr.splice(ran, 1)
            }
            runInAction(() => {
                this.imgArr = newarr
                this.pubu();

            })
        }, 10000)
    }
    @action pubu = () => {
        const {
            screenW,
            imgW,
            gap,
            items
        } = this
        //获取屏幕的宽度,注意获取body的宽度，不要用视口的，因为视口的宽度是不会变的，
        var cols = Math.floor(screenW / (imgW + gap)); //动态设置每一行可以放的图片
        //循环遍历每个图片
        for (var i = 0; i < items.length; i++) {
            if (i < cols) {
                //设置第一行的图片位置
                var boxHeight = items[i].offsetHeight;
                items[i].style.left = i * (imgW + gap) + "px";
                items[i].style.top = 0 + "px";
                heightArr[i] = boxHeight;
            } else {
                //拿到最低高度和它的索引
                var minH = Math.min.apply(Math.min, heightArr);
                var index = heightArr.indexOf(minH);
                //设置第二行的图片位置
                items[i].style.left = index * (imgW + gap) + "px";
                items[i].style.top = minH + gap + "px";
            }
            //每次设置一个图片的top后都要更新数组最低的高度
            // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
            heightArr[index] = heightArr[index] + items[i].offsetHeight + gap;
        }
    }

    @action publicSetMethod = (key, val) => {
        this[key] = val
    }
}



const store = new Store()

export default store