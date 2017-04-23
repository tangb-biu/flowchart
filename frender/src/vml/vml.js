define(function (require) {
    require('./graphic');
    require('../frender').registerPainter('vml', require('./Painter'));
});