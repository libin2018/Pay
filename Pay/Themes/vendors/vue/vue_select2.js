Vue.directive('select2', {
    inserted: function (el, binding) {
        var o = binding.value;
        var callback = o.callback || function (params) { return { name: params.term }; };
        var options = $.extend(o.cfg, { theme: "bootstrap" }, {
            ajax: {
                url: o.url,
                dataType: "json",
                delay: 500,
                data: callback,
                cache: true,
                processResults: function (res, params) {
                    var options = [{ "id": "", "text": " " }];
                    for (var i = 0, len = res.length; i < len; i++) {
                        var option = { "id": res[i].ID, "text": res[i].Name };
                        options.push(option);
                    }
                    return {
                        results: options,
                    };
                },
                escapeMarkup: function (markup) { return markup; },
                minimumInputLength: 1
            }
        });
        $(el).select2(options).on("select2:select", function (e) {
            el.dispatchEvent(new Event('change', { target: e.target }));
        });
    },
});


