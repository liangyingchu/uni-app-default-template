/**
 * 封装 uni API 调用
 * */
export const asyncWrap = (api, options={}) => new Promise((resolve, reject) => {
    return uni[api]({
        ...options,
        success: res => resolve(res),
        fail: err => reject(err)
    })
})


/**
 * 函数节流（throttle）
 * 函数节流的核心是，让一个函数不要执行得太频繁，减少一些过快的调用来节流。
 * 也就是在一段固定的时间内只触发一次回调函数，即便在这段时间内某个事件多次被触发，也只触发一次回调
 * */
export const throttle = function (func, gapTime) {
    if(typeof func !== 'function') {
        throw new TypeError('need a function');
    }
    gapTime = +gapTime || 0
    let lastTime = 0

    return function() {
        let time = + new Date()
        if(time - lastTime > gapTime || !lastTime) {
            func()
            lastTime = time
        }
    }
}
// 调用方式：每 1s 打印一次 'xxx'
// throttle(() => {
//     console.log('xxx')
// }, 1000)


/**
 * 函数防抖（debounce）
 * 函数防抖的原理是在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。
 * 也就是说事件来了，先 setTimeout 定个时，n 秒后再去触发回调函数。
 * 它和节流的不同在于，如果某段时间内事件以间隔小于 n 秒的频率执行，那么这段时间回调只会触发一次。
 * 节流则是按照 200ms 或者 300ms 定时触发，而不仅仅是一次。
 * */
export const debounce = function (func, wait) {
    if(typeof func !== 'function') {
        throw new TypeError('need a function')
    }
    wait = +wait || 0

    let timeId = null

    return function() {
        const self = this;
        const args = arguments;

        if(timeId) {
            clearTimeout(timeId);   // 清除定时器，重新设定一个新的定时器
        }
        timeId =  setTimeout(() => {
            func.apply(self, args); // arguments 是传给函数的参数，这里是 event  对象

        }, wait);

    }
}
// 调用方式：
// debounce(() => {
//     console.log('执行滚动处理函数啦')
// }, 1000)


/**
 * 日期格式化
 * @param: time - 日期对象/时间戳
 * @param: cFormat - 格式化字符串
 * */
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

/**
 * 格式化时间节点（至今）
 * @param: time - 时间戳 单位：秒
 * @param: option - 格式化字符串
 * */
export function formatTime(time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        )
    }
}

/**
 * URL 查询字串转换 Object 格式
 * @param: url - 链接字串
 * */
export function getQueryObject(url) {
    url = url == null ? window.location.href : url
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1)
        let val = decodeURIComponent($2)
        val = String(val)
        obj[name] = val
        return rs
    })
    return obj
}

/**
 * 数组去重
 * */
export function uniqueArr(arr) {
    return Array.from(new Set(arr))
}

/**
 * 格式化经纬度
 * */
export function formatLocation(longitude, latitude) {
    if (typeof longitude === 'string' && typeof latitude === 'string') {
        longitude = parseFloat(longitude)
        latitude = parseFloat(latitude)
    }

    longitude = longitude.toFixed(2)
    latitude = latitude.toFixed(2)

    return {
        longitude: longitude.toString().split('.'),
        latitude: latitude.toString().split('.')
    }
}