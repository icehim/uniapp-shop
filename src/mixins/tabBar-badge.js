import {mapGetters} from "vuex";

export default {
    computed: {
        ...mapGetters('cart', ['getTotal'])
    },
    // 首页、分类、购物车、我的、只要出现了都需要重新设置tabBar徽标的值
    onShow() {
        this.setBadge()
    },
    // 首页、分类、购物车、我的页面中，如果监听到仓库中值改变了，也需要重新设置tabBar徽标的值
    watch: {
        getTotal() {
            this.setBadge()
        }
    },
    methods: {
        setBadge() {
            if (this.getTotal > 0) {
                uni.setTabBarBadge({
                    index: 2,
                    text: `${this.getTotal}` //注意点:text必须是文字
                })
            } else {
                uni.removeTabBarBadge({
                    index: 2
                })
            }
        }
    }
}
