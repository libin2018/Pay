Vue.component('vue-pager', {
    template: '<div class="pager">'
    + '<div class="pageinfo">当前{{pageindex}}/{{totalpages}}页  共{{totalitems}}条纪录</div>'
    +'<ul class="pagination" v-show="totalpages>0"> '
    + '<li v-bind:class="{disabled:pageindex==1}"><a href="javascript:;" v-on:click="change(1)"><i class="la la-angle-double-left"></i></a></li>'
    + '<li v-bind:class="{disabled:pageindex<=1}"><a href="#" v-on:click="change(pageindex-1)"><i class="la la-angle-left"></i></a></li>'
                            + '<li v-for="btn in btns" v-bind:class="{active:btn==pageindex}"><a href="javascript:;" v-on:click="change(btn)">{{btn}}</a></li>'
    + '<li v-bind:class="{disabled:pageindex>=totalpages}"><a href="javascript:;" v-on:click="change(pageindex+1)"><i class="la la-angle-right"></i></a></li>'
    + '<li v-bind:class="{disabled:pageindex==totalpages}"><a href="javascript:;" v-on:click="change(totalpages)"><i class="la la-angle-double-right"></i></a></li>'
                        + '</ul>'
                         + '</div>',
    props: {
        totalpages: 0,
        totalitems: 0,
        pageindex: Number,
    },
    methods: {
        change: function (index) {
            if (index > this.totalpages || index < 1) {
                return;
            }
            this.$emit('change', index);
        },
        range: function (beg, end) {
            var ret = [];
            while (beg < end) {
                ret.push(beg);
                beg++;
            }
            return ret;
        }
    },
    computed: {
        btns: function () {
            if (this.totalpages <= 5) {
                return this.range(1, this.totalpages + 1);
            } else {
                if (this.pageindex < 4) {
                    return this.range(1, 6);
                } else if (this.pageindex > 3 && this.pageindex < this.totalpages - 1) {
                    return this.range(this.pageindex - 2, this.pageindex + 3);
                } else {
                    return this.range(this.totalpages - 4, this.totalpages + 1);
                }
            }
        }
    },
})
