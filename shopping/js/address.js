new Vue({
    el:'.container',
    data:{
        addressList:[],
        limitNumber:3,
        currentIndex:0,
        shippingAddress:1,
        delFlag:false,
        curAddress:"",
        editFlag:false,
        editAdd:"",
    },
    mounted:function () {
        this.$nextTick(function () {
            this.addressView();
        })
    },
    computed:{
        filterAddress:function () {
            return this.addressList.slice(0,this.limitNumber);
        }
    },
    methods:{
        addressView:function () {
            var _this=this;
            this.$http.get("data/address.json").then(function(response){
                var res = response.data;
                if(res.status=="0"){
                    _this.addressList=res.result;
                }
            });
        },
        setDefault:function (addressId) {
           this.addressList.forEach(function (address,id) {
               if(address.addressId==addressId)
                   address.isDefault=true;
               else address.isDefault=false;

           })
        },
        limitList:function () {
            if(this.limitNumber==this.addressList.length)
                this.limitNumber=3;
            else this.limitNumber=this.addressList.length;
        },
        addAddress:function () {
            this.addressList.push({"addressId":"100010",
                "userName":"幻月",
                "streetName":"上海市朝阳区朝阳公园1",
                "postCode":"100001",
                "tel":"12345678901",
                "isDefault":true});
            this.limitNumber=this.addressList.length;
        },
        delConfirm:function(item){
            this.delFlag=true;
            this.curAddress=item;

        },
        deleteAddress:function () {
           var index=this.addressList.indexOf(this.curAddress);
           this.addressList.splice(index,1);
           this.delFlag=false;

        },
        editConfirm:function(item){
            this.editFlag=true;
            this.aditAdd=item;

        },

    },
})