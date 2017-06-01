/**
 * 任务框
 * @module frender/custom/TaskBlock
 */
define('frender/custom/TaskBlock',['require','../graphic/shape/Polygon','../graphic/shape/Rect','../graphic/shape/Circle','../container/Group','../graphic/Text','../core/util'],function(require) {
	var Polygon = require('../graphic/shape/Polygon'),
		Rect = require('../graphic/shape/Rect'),
		Circle = require('../graphic/shape/Circle'),
		Group = require('../container/Group'),
		Text = require('../graphic/Text'),
		util = require('../core/util');
	function TaskBlock (zr, opt) {
		this._zr = zr;
		this._init(opt);
	}

	TaskBlock.prototype = {
		_init: function(opt) {
			this._id = util.uuid() + '_block';
			var code = 'var '+this._id + ' = new TaskBlock(zr, '+ JSON.stringify(opt)+')';
			this._zr.process.push(code);
			this._zr.cache.push(this);
			var source = {
				radius: 5, // 矩形周围的线柱半径
				width: 100, // 矩形的宽
			    height: 100, // 矩形的高
			    r: 4, // 矩形的圆角半径
			    x: 100, // 矩形的起始x
			    y: 100, // 矩形的起始y
			    start: false,
			    end: false,
			    style: {}
			};
			var that = this;
			if(!opt){
				//opt = source;
			}else{
				util.extend(source, opt);
			}
			var group = new Group();
			var rect, child;
			if(source.start) {
				rect = new Polygon({
					shape: {
			            points: [
			            	[source.x + source.width/2, source.y], 
			            	[source.x + source.width, source.y + source.height/2],
			            	[source.x + source.width/2, source.y + source.height],
			            	[source.x, source.y + source.height/2]
			            ],
            			smooth: 'spline',
			        },
			        style: source.style,
			        draggable: true,
				});
			} else if (source.end) {
				rect = new Polygon({
					shape: {
			            points: [
			            	[source.x + source.width/2, source.y], 
			            	[source.x + source.width, source.y + source.height/2],
			            	[source.x + source.width/2, source.y + source.height],
			            	[source.x, source.y + source.height/2]
			            ],
            			smooth: 'spline',
			        },
			        style: source.style,
			        draggable: true,
				});
			} else {
				rect = new Rect({
					shape: {
			            r: source.r,
			            x: source.x,
			            y: source.y,
			            width: source.width,
			            height: source.height
			        },
			        style: source.style,
			        draggable: true,
				});
				child = new Rect({
					shape: {
			            r: source.r,
			            x: source.x,
			            y: source.y,
			            width: source.width,
			            height: 20
			        },
			        style: {
			        	fill: '#b9c7da',
			        	stroke: '#333',
			        	text: source.title,
			        	textFill: '#000'
			        },
			        zlevel: 100
				});
			}
			var rectCaps = [];
			var rectCapsPos = function (x, y) {
				var arr = [];
				arr.push({
					x: source.x + source.width/2,
					y: source.y - source.radius - 3,
					dir: 'top',
					_parentId: that._id
				});
				arr.push({
					x: source.x + source.width + source.radius + 3 ,
					y: source.y + source.height/2,
					dir: 'right',
					_parentId: that._id
				});
				arr.push({
					x: source.x + source.width/2,
					y: source.y + source.height + source.radius + 3,
					dir: 'bottom',
					_parentId: that._id
				});
				arr.push({
					x: source.x - source.radius - 3,
					y: source.y + source.height/2,
					dir: 'left',
					_parentId: that._id
				});
				return arr;
			};
			for(var i=0,arr=rectCapsPos(source.x, source.y);i<arr.length;i++){
				var circle = new Circle({
					shape:{
						cx: arr[i].x,
			            cy: arr[i].y,
			            r: source.radius
			        },
			        style: {
			        	fill: !!(source.start || source.end ) ? '#7373f5' : '#735151'
			        },
			        zlevel: 100
				});
				circle.dir = arr[i].dir;
				circle._parentId = arr[i]._parentId;
				circle.follow = rect;
				circle.shape_cp = util.clone(circle.shape);
				group.add(circle);
				rectCaps.push(circle);
			}
			rect.on('drag', function(){
				if(child) child.transform = this.transform;
				for(var i=0;i<rectCaps.length;i++){
					rectCaps[i].setShape('cx', this.position[0] + rectCaps[i].shape_cp.cx);
					rectCaps[i].setShape('cy', this.position[1] + rectCaps[i].shape_cp.cy);
				}
			})
			group.add(rect);
			group.add(child);
			this._zr.add(group);
			this._rectCaps = rectCaps;
			this._rect = rect;
		},
		getPointObj: function() {
			return this._rectCaps;
		},
		getRect: function() {
			return this._rect;
		},
		setTransform: function( transform ) {
			// if(!transform) return;
			// var shape = this._rect.shape;
			// if(Object.prototype.toString.call(shape) != '[object Object]') return;
			// this._rect.setShape('x', shape.x += transform[4]);
			// this._rect.setShape('y', shape.y += transform[5]);
			// this._rectCaps.forEach(function(v){
			// 	v.setShape('cx', v.shape.cx + transform[4]);
			// 	v.setShape('cy', v.shape.cy + transform[5]);
			// })
		},
		getTransform: function() {
			return this._rect.transform;
		}
	}
	return TaskBlock;
});