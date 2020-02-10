Vue.directive('chan', {
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
                url: '/api/Query/GetMChannelSelList',
                type: 'get',
                dataType: 'json',
                delay: 50,
                data: function (params) {
                    var ex = { type: binding.value.key, name: params.term };
                    if (binding.value.para) {
                        var o = binding.value.para();
                        ex = $.extend(o, ex);
                    }
                    return ex;
                },
                processResults: function (data, params) {
                    var tmp = [{ "id": "", "text": "" }];
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
            $(el).addClass('edited');
        });
        //初始化样式
        $(el).val("").trigger('change');
        //$(el).addClass('edited');
    },
    update: function (el, binding) {
        if (binding.value.def && $(el).attr("isdef") === "0") {
            var val = binding.value.def(el, binding);
            if (val && val !== "" && val !== null) {
                $.get('/api/Query/GetMChannelSelList?id=' + val, function (res) {
                    $(el).append("<option value='" + res.ID + "'>" + res.Text + "</option>");
                    $(el).val([res.ID]).trigger('change');
                    $(el).addClass('edited');
                });
            };
            $(el).attr("isdef", "1");
        }
    }
});