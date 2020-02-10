var exsshelper = Vue.directive('exss', {
    inserted: function (el, binding) {
        var o = $.extend({ opr: "=", type: 0, format: "" }, binding.value);
        var ext = exsshelper.get_exss(o);
        $(el).attr("exss", ext);
    },
    get_exss: function (o) {
        switch (o.format.toLowerCase()) {
            case "number":
                return o.key + o.opr + "[val]";
            case "date":
                return o.key + o.opr + "Convert.ToDateTime(\"[val]\")";
            case "like":
                return o.key + ".Contains([strval])";
            case "startof":
                return o.key + ".StartsWith([strval])";
            case "maxdate":
                return o.key + o.opr + "Convert.ToDateTime(\"[val] 23:59:59\")";
            case "begdate":
                return o.key + o.opr + "Convert.ToDateTime(\"[val] 00:00:00\")";
            case "enddate":
                return o.key + o.opr + "Convert.ToDateTime(\"[val] 23:59:59\")";
            default:
                return o.key + o.opr + "[strval]";
        }
    },
    build_exss: function () {
        var exss_tmp = $("[exss]");
        var tmps = [];
        var vals = [];
        var conn = "";
        for (var i = 0; i < exss_tmp.length; i++) {
            var o = exss_tmp[i];
            var exss = $(o).attr("exss");
            var val = $(o).val();
            if (val && val != null) {
                if ($.isArray(val)) {
                    var ar = [];
                    $(val).each(function () {
                        if (this != "") {
                            ar.push(exss.replace("[val]", this));
                        }
                    })
                    if (ar.length > 0) {
                        tmps.push("(" + ar.join("||") + ")");
                    }
                }
                else if (val.trim() != "") {
                    if (exss.indexOf(["strval"]) > 0) {
                        var s = exss.replace("[strval]", "@" + vals.length);
                        vals.push(val);
                        tmps.push(s);
                    }
                    else {
                        var s = exss.replace("[val]", val);
                        tmps.push(s);
                    }
                }
                conn += exsshelper.build_search_column(o);
            }
        }
        if (conn == null || conn == "") {
            $(".select-choices-bar").hide();
        }
        else {
            $(".select-choices-bar").show();
            $(".select-choices").html(conn);
        }
        //去除条件
        $('.search-from .remove-columus').on('click', function () {
            var selID = $(this).find(".selID").val();
            $("#" + selID).val("");
            $("#" + selID).removeClass("edited");
            var end = selID.substring(selID.length - 3, selID.length);
            if (end == "beg") {
                var selEndID = selID.substring(0, selID.length - 3) + "end";
                $("#" + selEndID).val("");
                $("#" + selEndID).removeClass("edited");
            }
            $(this).remove();
            $("#" + selID).val("");
            setTimeout(function () {
                $("#select2-" + selID + "-container").text("");
            }, 100);
            $("#select2-" + selID + "-container").empty();
            Query();
        });

        return { Ques: tmps, Vals: vals };
    },
    custom_exss: function (list) {
        var tmps = [];
        var vals = [];
        for (var i = 0; i < list.length; i++) {
            var o = $.extend({ opr: "=", type: 0, format: "" }, list[i]); 
            var exss = exsshelper.get_exss(o);
            if (exss.indexOf(["strval"]) > 0) {
                var s = exss.replace("[strval]", "@" + vals.length);
                vals.push(o.val);
                tmps.push(s);
            }
            else {
                var ss = exss.replace("[val]", o.val);
                tmps.push(ss);
            }
        }
        return { Ques: tmps, Vals: vals };
    },
    build_search_column:function(_this) {
        var conn = "";
        var tag = $(_this).prop("tagName");
        var id = $(_this).attr("id");
        if (id && id !== "") {
            var title = $(_this).siblings("label").text();
            var textValue = $.trim($(_this).val());
            if (tag === "SELECT") {
                conn = "<li class=\"select-search-choice remove-columus\" title=\"移除\"><span>" + title + "：" + $("#" + id).find("option:selected").text() + "</span><input type='hidden' class='selID' value='" + id + "' /> <i class=\"fa fa-times\"></i></li>";
            }
            else {
                if (id.indexOf("_beg") > -1) {
                    conn = "<li class=\"select-search-choice remove-columus\" title=\"移除\"><span>" + title + "-开始" + "：" + $("#" + id).val() + "</span><input type='hidden' class='selID' value='" + id + "' /> <i class=\"fa fa-times\"></i></li>";
                } else if (id.indexOf("_end") > -1) {
                    conn = "<li class=\"select-search-choice remove-columus\" title=\"移除\"><span>" + title + "-结束" + "：" + $("#" + id).val() + "</span><input type='hidden' class='selID' value='" + id + "' /> <i class=\"fa fa-times\"></i></li>";
                } else {
                    conn = "<li class=\"select-search-choice remove-columus\" title=\"移除\"><span>" + title + "：" + $("#" + id).val() + "</span><input type='hidden' class='selID' value='" + id + "' /> <i class=\"fa fa-times\"></i></li>";
                }

            }
        };
        return conn;        
    }
});