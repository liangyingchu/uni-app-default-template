
/* 空字符串*/
export function validEmpty(str) {
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        }
    }

    str = str.trim()
    return str.length === 0
}

/* 合法uri*/
export function validURL(url) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(url)
}

/* 小写字母*/
export function validLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/* 大写字母*/
export function validUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/* 大小写字母*/
export function validAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

/* email格式*/
export function validEmail(email) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)
}

/* 密码强度（最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符)*/
export function validStrongPassword(password) {
    const reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
    return reg.test(password)
}

/* 包含中文正则*/
export function validChinese(str) {
    const reg = /[\u4E00-\u9FA5]/
    return reg.test(str)
}

/* 身份证*/
export function validIdCardNo(num) {
    num = num.toUpperCase()
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) return false
    var len = num.length, re
    if (len == 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
        var arrSplit = num.match(re),dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]),bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]))
        if (!bGoodDay) {
            return false
        } else {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2), arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'),nTemp = 0, i
            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6)
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i]
            }
            num += arrCh[nTemp % 11]
            return num
        }
    }
    if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
        var arrSplit = num.match(re),dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]),bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]))
        if (!bGoodDay) {
            return false
        } else {
            var valnum, arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2),arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'), nTemp = 0, i
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i]
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                return false
            }
            return num
        }
    }
    return false
}

