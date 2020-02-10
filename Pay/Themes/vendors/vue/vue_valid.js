
/*
���vee-validate https://baianat.github.io/vee-validate/

after{target} - ��targetҪ���һ���Ϸ����ڣ���ʽ(DD/MM/YYYY)
alpha - ֻ����Ӣ���ַ�
alpha_dash - ���԰���Ӣ�ġ����֡��»��ߡ����ۺ�
alpha_num - ���԰���Ӣ�ĺ�����
before:{target} - ��after�෴
between:{min},{max} - ��min��max֮�������
confirmed:{target} - �����targetһ��
date_between:{min,max} - ������min��max֮��
date_format:{format} - �Ϸ���format��ʽ������
decimal:{decimals?} - ���֣�������decimals����
digits:{length} - ����Ϊlength������
dimensions:{width},{height} - ���Ͽ�߹涨��ͼƬ
email - ������
ext:[extensions] - ��׺��
image - ͼƬ
in:[list] - ����������list�ڵ�ֵ
ip - ipv4��ַ
max:{length} - ��󳤶�Ϊlength���ַ�
mimes:[list] - �ļ�����
min - max�෴
mot_in - in�෴
numeric - ֻ��������
regex:{pattern} - ֵ�����������pattern
required - ������
size:{kb} - �ļ���С������
url:{domain?} - (ָ��������)url*/

function Valider(cfg) {
    var o = [];
    for (var i in cfg) {
        o[i] = cfg[i].type;
    }
    var validator = new VeeValidate.Validator(o);
    validator.getErrors = function () {
        var tmp = [];
        for (var i = 0; i < validator.errors.items.length; i++) {
            tmp.push(cfg[validator.errors.items[i].field].msg);
        }
        return tmp;
    };

    validator.valid = function (model,suss,fail) {
        validator.validateAll(vm.entity).then(function (valid) {
            if (valid) {
                suss();
            }
            else {
                var errors = validator.getErrors();
                if (fail) {
                    fail(errors);
                }
                else {
                    alert(errors[0]);
                }
            }
        });
    };
    return validator;
}