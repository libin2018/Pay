Vue.component('vue-sel-terrs', {
    props: ['options', 'value'],
    template: '<select><slot></slot></select>',
    mounted: function () {
        _this = this;
        var vmS2 = this
        $(this.$el)
            // init select2
            .select2(
            {
                width: "100%",
                allowClear: false,
                ajax: {
                    url: '/api/Shared/GetTerrsByUser',
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

                        // 过滤数据(应该在ajax时处理)
                        var query = params.term;
                        if (query != null && query.length > 0) {
                            query = query.toLowerCase();
                            data = data.filter(function (item) {
                                return item.Terr_Caption.toLowerCase().indexOf(query) > -1;
                            });
                        }

                        // 数据转换
                        data.map(x => options.push({ id: x.Terr_TerritoryID, text: $.trim(x.Bran_Number) + $.trim(x.Terr_Caption) }));

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
                if ($(this).val() != null && $(this).val().length > 0) {
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
            // update value
           
            $(this.$el)
                .val(value)
                .trigger('change')
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