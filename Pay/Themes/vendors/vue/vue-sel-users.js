Vue.component('vue-sel-users', {
    props: ['type', 'value', 'valtype'],
    template: '<select><slot></slot></select>',
    mounted: function () {
        _this = this;
        var vmS2 = this;
        var type = this.type;
        var valtype = this.valtype;
        $(this.$el)
            // init select2
            .select2(
            {
                width: "100%",
                allowClear: false,
                ajax: {
                    url: '/api/Shared/GetUserSel2Async',
                    type: 'get',
                    dataType: 'json',
                    delay: 50,
                    data: function (params) {
                        return { type: type, query: params.term };
                    },
                    processResults: function (data, params) {
                        var options = [{ "id": "", "text": "" }];
                        
                        if (type == 'Tmk') {
                            if (valtype == 'UserLogon') {
                                // 登录名
                                data.map(x => options.push({ id: $.trim(x.Tmk_Name), text: $.trim(x.Tmk_Name) })); 
                            } else if (valtype == 'UserEn') {
                                // 英文名
                                data.map(x => options.push({ id: $.trim(x.Tmk_EnName), text: $.trim(x.Tmk_EnName) })); 
                            } else if (valtype == 'UserCn') {
                                // 中文名
                                data.map(x => options.push({ id: $.trim(x.Tmk_CnName), text: $.trim(x.Tmk_CnName) }));
                            } else {
                                // 中英文名
                                data.map(x => options.push({ id: x.Tmk_TmkUsersID, text: $.trim(x.Tmk_EnName) + $.trim(x.Tmk_CnName) })); 
                            }
                        }
                        else if (type == "Promoter") {
                            if (valtype == 'UserLogon') {
                                // 登录名
                                data.map(x => options.push({ id: $.trim(x.Prom_Name), text: $.trim(x.Prom_Name) })); 
                            } else if (valtype == 'UserEn') {
                                // 英文名
                                data.map(x => options.push({ id: $.trim(x.Prom_EnName), text: $.trim(x.Prom_EnName) })); 
                            } else if (valtype == 'UserCn') {
                                // 中文名
                                data.map(x => options.push({ id: $.trim(x.Prom_CnName), text: $.trim(x.Prom_CnName) }));
                            } else {
                                // 中英文名
                                data.map(x => options.push({ id: x.Prom_PromoterID, text: $.trim(x.Prom_EnName) + $.trim(x.Prom_CnName) })); 
                            }
                        }
                        else if (type == "SA") {
                            if (valtype == 'UserLogon') {
                                // 登录名
                                data.map(x => options.push({ id: $.trim(x.Saer_Name), text: $.trim(x.Saer_Name) }));
                            } else if (valtype == 'UserEn') {
                                // 英文名
                                data.map(x => options.push({ id: $.trim(x.Saer_EnName), text: $.trim(x.Saer_EnName) }));
                            } else if (valtype == 'UserCn') {
                                // 中文名
                                data.map(x => options.push({ id: $.trim(x.Saer_CnName), text: $.trim(x.Saer_CnName) }));
                            } else {
                                // 中英文名
                                data.map(x => options.push({ id: x.Saer_SAUsersID, text: $.trim(x.Saer_EnName) + $.trim(x.Saer_CnName) })); 
                            }
                        }
                        else {
                            if (valtype == "UserLogon") {
                                // 登陆名
                                data.map(x => options.push({ id: $.trim(x.User_Logon), text: $.trim(x.User_Logon) }));
                            }
                            else if (valtype == "UserEn") {
                                // 英文（Last）
                                data.map(x => options.push({ id: $.trim(x.User_LastName), text: $.trim(x.User_LastName) }));
                            } else if (valtype == "UserCn") {
                                // 中文（First）
                                data.map(x => options.push({ id: $.trim(x.User_FirstName), text: $.trim(x.User_FirstName) }));
                            } else {
                                // 中英文名
                                data.map(x => options.push({ id: x.User_UserID, text: $.trim(x.User_LastName) + $.trim(x.User_FirstName) })); 
                            }
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