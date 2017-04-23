({
    // appDir: './',
    baseUrl: '../src',
    optimize: 'none',
    name: 'frender',
    packages: [
        {
            name: 'frender',
            location: '.',
            main: 'frender'
        }
    ],
    include:[
        'frender/graphic/Image',
        'frender/graphic/Text',
        'frender/graphic/shape/Rose',
        'frender/graphic/shape/Trochoid',
        'frender/graphic/shape/Circle',
        'frender/graphic/shape/Sector',
        'frender/graphic/shape/Ring',
        'frender/graphic/shape/Ellipse',
        'frender/graphic/shape/Rect',
        'frender/graphic/shape/Heart',
        'frender/graphic/shape/Droplet',
        'frender/graphic/shape/Line',
        'frender/graphic/shape/Star',
        'frender/graphic/shape/Isogon',
        'frender/graphic/shape/BezierCurve',
        'frender/graphic/shape/Polyline',
        'frender/graphic/shape/Polygon',
        'frender/graphic/shape/Arrow',
        'frender/container/Group',
        'frender/custom/TaskBlock',
        'frender/custom/LineTo',
        'frender/vml/vml'
    ],
    out: 'frender.js'
})