function load_capt(el, family) {
    $.ajax({
        url: "/api/Shared/Captions/" + family,
        type: 'GET',
        async: false,
        success: function (res) {
            $(res).each(function () {
                $(el).append("<option value='" + this.Capt_Code + "'>" + this.Capt_CS + "</option>");
            });
        },
    });
}

Vue.directive('capt', {
    inserted: function (el, binding) {
        //$(el).addClass('edited');
        var cfg = $.extend({ load: false }, binding.value);
        if (cfg.load) {
            cfg.load = true;
            load_capt(el, cfg.family);
        }
        else {
            $(el).mousedown(function () {
                if (!cfg.load) {
                    cfg.load = true;
                    load_capt(el, cfg.family);
                }
            });
        }
    },
    update: function (el, binding) {
        if (binding.value.callback) {
            binding.value.callback(el, binding);
        }
    }
});

Vue.directive('sel', {
    inserted: function (el, binding) {
        var def = {
            width: "100%",
            ajax: {
                url: '/api/Query/GetSelList/' + binding.value.key,
                type: 'get',
                dataType: 'json',
                delay: 50,
                data: function (params) {
                    var p = { query: params.term };
                    if(binding.value.para)
                    {
                        var e = binding.value.para();
                        $.extend(p,e);
                    }
                    return p;
                },
                processResults: function (data, params) {
                    var tmp = [{ "id": "", "text": "" }];
                    data.map(x => tmp.push({ id: $.trim(x.ID), text: $.trim(x.Text) }));
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
        $(el).val("").trigger('change');

    },
    update: function (el, binding) {
        if (binding.value.def && $(el).attr("isdef") === "0") {
            var val = binding.value.def(el, binding);
            if (val && val !== "" && val !== null) {
                $.get('/api/Query/GetSelList/' + binding.value.key + '?id=' + val, function (res) {
                    $(el).append("<option value='" + res.ID + "'>" + res.Text + "</option>");
                    $(el).val([res.ID]).trigger('change');
                    $(el).addClass('edited');
                });
            };
            $(el).attr("isdef", "1");
        }
    }
});

Vue.directive('sel2', {
    inserted: function (el, binding) {
        var cfg = $.extend({ load: false }, binding.value);
        if (cfg.load) {
            cfg.load = true;
            getSelList(el, binding.value.key);
        }
        else {
            $(el).mousedown(function () {
                if (!cfg.load) {
                    cfg.load = true;
                    getSelList(el, binding.value.key);
                }
            });
        }
    },
    update: function (el, binding, vnode) {
        $(el).trigger("change");
    },
    componentUpdated: function (el, binding, vnode) {
        $(el).trigger("change");
    }
});

function getSelList(el, key)
{
    $.get('/api/Query/GetSelList/' + key, function (res) {
        $(res).each(function () {
            $(el).append("<option value='" + this.ID + "'>" + this.Text + "</option>");
        });
    });
}

Vue.directive('tag', {
    inserted: function (el, binding) {
        $.get("/api/Shared/GetTags", function (res) {
            $(res).each(function () {
                $(el).append("<option value='" + this + "'>" + this + "</option>");
            });
        });
        var o = {
            tags: true,
            createTag: function (params) {
                var term = $.trim(params.term);
                if (term.indexOf(" ") >= 0) {
                    term = term.replace(/ /g, "");
                }
                if (term === '') {
                    return null;
                }
                return {
                    id: term,
                    text: term,
                    newTag: true // add additional parameters
                };
            }
        };
        $(el).select2(o).on("select2:select", function (e) {
            el.dispatchEvent(new Event('change', { target: e.target }));
        });
    },
    update: function (el, binding, vnode) {
        $(el).trigger("change");
    },
    componentUpdated: function (el, binding, vnode) {
        $(el).trigger("change");
    }
});



Vue.directive('time', {
    inserted: function (el, binding) {
        var options = $.extend({
            startView: 2,
            minView: 2,
            format: "yyyy-mm-dd",
            autoclose: true,
            todayBtn: false,
            language: 'zh-CN'
        }, binding.value);
        $(el).datetimepicker(options).on('changeDate', function (e) {
            el.dispatchEvent(new Event('input', { target: e.target }));
        });
    },
});
