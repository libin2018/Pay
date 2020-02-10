Vue.component('vue-sel-2', {
    props: ['url', 'value', 'fieldid', 'fieldname', 'isfilter'],
    template: '<select><slot></slot></select>',
    mounted: function () {
        _this = this;
        var vmS2 = this;
        var url = this.url;
        var fieldid = "id";
        var fieldname = "text";
        var isfilter = typeof (this.isfilter) == "undefined" ? false : this.isfilter;
        var groupfeildname = [];
        if (typeof (this.fieldname) != "undefined") {
            var index = this.fieldname.indexOf("*");
            if (index > 0) {
                groupfeildname = this.fieldname.split('*');
            } else {
                fieldname = this.fieldname;
            }
        }
        if (typeof (this.fieldid) != "undefined") {
            fieldid = this.fieldid
        }
        $(this.$el)
            // init select2
            .select2(
            {
                width: "100%",
                allowClear: false,
                matcher: function (term, text, opt) {
                    return text.toUpperCase().indexOf(term.toUpperCase()) >= 0;
                },
                ajax: {
                    url: url,
                    type: 'get',
                    dataType: 'json',
                    delay: 50,
                    data: function (params) {
                        return { query: params.term };
                    },

                    processResults: function (data, params) {
                        var options = [{ "id": "", "text": "" }];
                        // 前台筛选数据
                        if (isfilter) {
                            // 过滤数据(应该在ajax时处理)
                            var query = params.term;
                            if (query != null && query.length > 0) {
                                query = query.toLowerCase();
                                data = data.filter(function (item) {
                                    return item.Terr_Caption.toLowerCase().indexOf(query) > -1;
                                });
                            }
                        }

                        for (var i = 0, len = data.length; i < len; i++) {
                            var option = { "id": data[i][fieldid], "text": "" };

                            if (groupfeildname.length == 0) {
                                option.text = data[i][fieldname];
                            } else {
                                for (var j = 0; j < groupfeildname.length; j++) {
                                    option.text += data[i][groupfeildname[j]];
                                }
                            }

                            options.push(option);
                        }
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


Vue.component('vue-sel-2-mul', {
    props: {
        url: String,
        value: Array,
        fieldid: String,
        fieldname: String,
        isfilter: Boolean
    },
    template: '<select><slot></slot></select>',
    mounted: function () {
        _this = this;
        var vmS2 = this;
        var url = this.url;
        var fieldid = "id";
        var fieldname = "text";
        var isfilter = typeof (this.isfilter) == "undefined" ? false : this.isfilter;
        var groupfeildname = [];
        if (typeof (this.fieldname) != "undefined") {
            var index = this.fieldname.indexOf("*");
            if (index > 0) {
                groupfeildname = this.fieldname.split('*');
            } else {
                fieldname = this.fieldname;
            }
        }
        if (typeof (this.fieldid) != "undefined") {
            fieldid = this.fieldid
        }
        $(this.$el)
            // init select2
            .select2(
            {
                width: "100%",
                allowClear: false,
                matcher: function (term, text, opt) {
                    return text.toUpperCase().indexOf(term.toUpperCase()) >= 0;
                },
                ajax: {
                    url: url,
                    type: 'get',
                    dataType: 'json',
                    delay: 50,
                    data: function (params) {
                        return { query: params.term };
                    },

                    processResults: function (data, params) {
                        var options = [{ "id": "", "text": "" }];
                        // 前台筛选数据
                        if (isfilter) {
                            // 过滤数据(应该在ajax时处理)
                            var query = params.term;
                            if (query != null && query.length > 0) {
                                query = query.toLowerCase();
                                data = data.filter(function (item) {
                                    return item[fieldname].toLowerCase().indexOf(query) > -1;
                                });
                            }
                        }

                        for (var i = 0, len = data.length; i < len; i++) {
                            var option = { "id": data[i][fieldid], "text": "" };

                            if (groupfeildname.length == 0) {
                                option.text = data[i][fieldname];
                            } else {
                                for (var j = 0; j < groupfeildname.length; j++) {
                                    option.text += data[i][groupfeildname[j]];
                                }
                            }

                            options.push(option);
                        }
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
                vmS2.$emit('input', $(this).val())

            })
    },
    watch: {
        value: function (value) {
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

function InitSel2Control(id, val, text) {
    if ($("#" + id).find("options[value='" + val + "']").length > 0) {
        $("#" + id).trigger("change");
    } else {
        var newOptions = new Option(text, val, true, true);
        $("#" + id).append(newOptions).trigger("change");
    }
}

function InitSel2Option(id, val, text) {
    var newOptions = new Option(text, val, true, true);
    $("#" + id).append(newOptions)
}