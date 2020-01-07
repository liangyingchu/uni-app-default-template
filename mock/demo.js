import Mock from 'mockjs'

/**
 生成规则 有 7 种格式：
 'name|min-max': value
 'name|count': value
 'name|min-max.dmin-dmax': value
 'name|min-max.dcount': value
 'name|count.dmin-dmax': value
 'name|count.dcount': value
 'name|+step': value

 生成规则 的含义需要依赖 属性值的类型 才能确定。
 属性值 中可以含有 @占位符。
 属性值 还指定了最终值的初始值和类型。

 占位符 的格式：@占位符、@占位符(参数 [, 参数])
 占位符 引用的是 Mock.Random 中的方法
 * */

export default {
    getList: () => {
        const list = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|1-10': [{
                'id|+1': 1, // 属性值自动加 1，初始值为 1
                'rangeIntNum|90-100': 90, // 生成一个大于等于 90、小于等于 100 的整数，属性值 90 只是用来确定类型
                'rangeFloatNum|1-100.1-2': 1, // 生成一个浮点数，整数部分大于等于 1、小于等于 100，小数部分保留 1 到 2 位
                'bool|1': true, // 随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2
                'regexp': /[a-z][A-Z][0-9]/, // 根据正则表达式 regexp 反向生成可以匹配它的字符串。用于生成自定义格式的字符串
                // 占位符
                title: '@title',
                full: '@first @middle @last',
                date: '@datetime',
                email: '@email'
            }]
        })

        return {
            code: 200,
            body: list,
            message: 'success'
        }
    }
}