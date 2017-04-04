/**
 * 圆形
 * @module zrender/graphic/shape/Arrow
 */

define(function (require) {
    'use strict';

    return require('../Path').extend({

        type: 'circle',

        shape: {
            points: [],
            angle: 15,
            edgeLen: 50
        },

        buildPath : function (ctx, shape, inBundle) {
            var points = shape.points;
            var CONST = {
                edgeLen: shape.edgeLen || 50,
                angle: shape.angle || 25
                },
                end = points[1],
                endPre = points[0],
                x = end[0] - endPre[0],
                y = end[1] - endPre[1],
                length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

            if(length < 250) {
                CONST.edgeLen = CONST.edgeLen/2;
                CONST.angle/2;
            } else if (length < 500) {
                CONST.edgeLen = CONST.edgeLen * length / 500;
                CONST.angle = CONST.angle * length / 500;
            }

            var angle = Math.atan2(end[1] - endPre[1], end[0] - endPre[0]) / Math.PI * 180;

            var arrowpoints = [];
            arrowpoints[0] = end[0] - CONST.edgeLen * Math.cos(Math.PI / 180 * (angle - CONST.angle));
            arrowpoints[1] = end[1] - CONST.edgeLen * Math.sin(Math.PI / 180 * (angle - CONST.angle));
            arrowpoints[2] = end[0];
            arrowpoints[3] = end[1];
            arrowpoints[4] = end[0] - CONST.edgeLen * Math.cos(Math.PI / 180 * (angle + CONST.angle));
            arrowpoints[5] = end[1] - CONST.edgeLen * Math.sin(Math.PI / 180 * (angle + CONST.angle));
            ctx.lineTo(arrowpoints[0], arrowpoints[1]);
            ctx.lineTo(arrowpoints[2], arrowpoints[3]);
            ctx.lineTo(arrowpoints[4], arrowpoints[5]);
            ctx.lineTo(arrowpoints[0], arrowpoints[1]);
            ctx.closePath();
        }
    });
});
