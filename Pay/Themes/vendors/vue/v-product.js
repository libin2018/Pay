Vue.directive('product', {
    inserted: function (el, binding) {
        var def = {
            width: "100%",
            templateResult: function (state) {
                if (!state.id) { return state.text; }
                var chan = state.text.split("\\");
                var $state = $(
                    '<span>' + state.text + '</span><br/><span style=\"color:#888\">' + state.code + '</span>'
                );
                console.log($state);
                return $state;
            },
            ajax: {
                url: '/api/Query/GetProducts',
                type: 'get',
                dataType: 'json',
                delay: 50,
                data: function (params) {
                    return { name: params.term };
                },
                processResults: function (data, params) {
                    var tmp = [];
                    data.map(x => tmp.push({ id: $.trim(x.ID), text: $.trim(x.Text), code: $.trim(x.Code) }));
                    return {
                        results: tmp
                    };
                },
                cache: true,
                escapeMarkup: function (markup) { return markup; },
                minimumInputLength: 1,
            },
        };
        $(el).attr("isdef", "0");
        var options = $.extend(binding.value, def);
        $(el).select2(options).on("select2:select", function (e) {
            el.dispatchEvent(new Event('change', { target: e.target }));
        });
        //初始化样式
        $(el).val("").trigger('change');
    }
});