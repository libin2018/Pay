Vue.component('vue-sel-captions', {
    props: ['options', 'value'],
    template: '<select><slot></slot></select>',
    mounted: function () {
        _this = this;
        var vmS2 = this;
        $(this.$el)
            .select2(
            {
                width: "100%",
                allowClear: false,
                ajax: {
                    url: '/api/Shared/Captions/' + _this.options,
                    type: 'get',
                    dataType: 'json',
                    delay: 50,
                    data: function (params) {
                        //return {
                        //    keyword: params.term,
                        //    configType: "project",
                        //    limitRow: 200
                        //};
                    },
                    processResults: function (data, params) {
                        var options = [{ "id": "", "text": "" }];
                        data.map(x => options.push({ id: x.Capt_Code, text: $.trim(x.Capt_CS) })); 

                        return {
                            results: options
                        };
                    },
                    cache: true
                },
                escapeMarkup: function (markup) { return markup; }
            }
            ).val(this.value).trigger('change')
            // emit event on change.
            .on('change', function () {
                if (this.value != null && this.value.length > 0) {
                    $(this).addClass('edited');
                }
                else {
                    $(this).removeClass('edited');
                }
                vmS2.$emit('input', this.value)
            })
    },
    watch: {
       
        value: function (value) {
            
            $(this.$el)
                .val(value)
                .trigger('change');
        },
        options: function (options) {
            // update options
            $(this.$el).empty().select2({ data: options })
        }
    },
    destroyed: function () {
        $(this.$el).off().select2('destroy')
    }
});