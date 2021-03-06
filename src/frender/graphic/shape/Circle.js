/**
 * 圆形
 * @module frender/shape/Circle
 */

define('frender/graphic/shape/Circle',['require','../Path'],function (require) {
    

    return require('../Path').extend({

        type: 'circle',

        shape: {
            cx: 0,
            cy: 0,
            r: 0
        },


        buildPath : function (ctx, shape, inBundle) {
            // Better stroking in ShapeBundle
            // Always do it may have performence issue ( fill may be 2x more cost)
            if (inBundle) {
                ctx.moveTo(shape.cx + shape.r, shape.cy);
            }
            // Better stroking in ShapeBundle
            // ctx.moveTo(shape.cx + shape.r, shape.cy);
            ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2, true);
        }
    });
});