new Vue({
    el:"#app",
    data:{
        productList:[],
        checkALlFlag:false,
        totalMoney:0,
        delFlag:false,
        curProduct:"",


    },
    filters:{
        fomatMoney:function (value) {
            return '￥'+value.toFixed(2);

        }
    },
    mounted:function () {
        this.$nextTick(function () {
            this.cartView();
        })
    },
    methods:{
        cartView:function () {
            var _this=this;
            this.$http.get("data/cartData.json").then(function (response) {
                var res=response.data
                if(res.status=='1')
                _this.productList=res.result.list;
            })
        },
        changeMoney:function (product,way) {
            if(way>0&&product.productQuantity>=0){ product.productQuantity++;}
            else if (way<0&&product.productQuantity>1)
            {product.productQuantity--;}
            else {product.productQuantity=1;}
            this.calcTotalPrice();

        },
        selectedProduct:function(item){
            if(typeof item.checked=='undefined'){
                Vue.set(item,'checked',true)
            }else{
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll:function (flag) {
            this.checkAllFlag=flag;
            var _this=this;
            this.productList.forEach(function (item,index) {
                if (typeof item.checked=='undefined'){
                    _this.$set(item,"checked",_this.checkAllFlag)}
                else{
                    item.checked=_this.checkAllFlag;
                }

            })
            this.calcTotalPrice();
        },
        calcTotalPrice:function () {
            var _this=this;
            this.totalMoney=0;
            this.productList.forEach(function (item,index) {
                if(item.checked==true){
                    _this.totalMoney+=item.productPrice*item.productQuantity;
                }

            })
        },
        delConfirm:function (item) {
            this.delFlag=true;
            this.curProduct=item;
        },
        delProduct:function () {
            var index=this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag=false;
        }


    },



});