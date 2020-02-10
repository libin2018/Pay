Vue.component('vue-select', {
    props: { options: "", count: 0, loader: false },
    template: '<select :id="options" v-on:mousedown="load()"><option value="" selected>--请选择--</option><option v-for="el in captions" :value="el.Capt_Code">{{el.Capt_CS}}</option></select>',
    mounted: function () {
        alert(this.options);
    },
    methods: {
        load: function ()
        {
            if (!this.loader)
            {
              
                this.loader = true;
               
            }
        }
    },
    
    computed: {
        captions: function () {
            if (this.loader) {
                var list = [];
                $.ajax({
                    type: "Get",
                    url: '/api/Shared/Captions/' + this.options,
                    async: false,
                    success: function (data) {
                        list = data;
                        //this.count = data.length;
                        this.$nextTick(function () {
                        })
                    }
                });
                return list;
            }
        }
    },
    watch: {

       
    },
    destroyed: function () {
        
    }
});