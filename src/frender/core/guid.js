/**
 * frender: 生成唯一id
 *
 * @author errorrik (errorrik@gmail.com)
 */

define('frender/core/guid',[],function() {
    var idStart = 0x0907;

    return function () {
        return idStart++;
    };
});