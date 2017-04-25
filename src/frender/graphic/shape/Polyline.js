/**
 * @module frender/graphic/shape/Polyline
 */
define('frender/graphic/shape/Polyline',['require','../helper/poly','../Path'],function (require) {

    var polyHelper = require('../helper/poly');

    return require('../Path').extend({
        
        type: 'polyline',

        shape: {
            points: null,

            smooth: false,

            smoothConstraint: null
        },

        style: {
            stroke: '#000',

            fill: null
        },

        buildPath: function (ctx, shape) {
            polyHelper.buildPath(ctx, shape, false);
        }
    });
});