define('frender/vml/vml',['require','./graphic','../frender','./Painter'],function (require) {
    require('./graphic');
    require('../frender').registerPainter('vml', require('./Painter'));
});