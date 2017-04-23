 /**
 * 连接线
 * @module zrender/custom/LineTo
 */
 define(function(require) {

 	var Group = require('../container/Group');
 	var Polyline = require('../graphic/shape/Polyline');
 	var Arrow = require('../graphic/shape/Arrow');
 	var util = require('../core/util');

 	function LineTo(zr, task, lineCache, helpLine) {
		this._init(zr, task, lineCache, helpLine);
	}
	LineTo.prototype = {
		constructor: LineTo,

		_init: function(zr, task, lineCache, helpLine) {
			this._zr = zr;
			this._task = task;
			this._lineCache = lineCache;
			this._helpLine = helpLine;
			this._initElement();
		},
		drawLine: function (start, end) {
			var group = new Group();
			var pline = new Polyline({
				shape: {
					points: [[start.shape.cx + start.position[0], start.shape.cy + start.position[1]], [end.shape.cx + end.position[0], end.shape.cy + end.position[1]]],
				}
			})
			var len = pline.shape.points.length;
			var arrow = new Arrow({
				shape: {
					points: pline.shape.points.slice(-2),
					angle: 15,
            		edgeLen: 40
				}
			});
			group.add(pline);
			group.add(arrow);
			start.follow.on('drag', function(){
				var x1 = start.position[0] + start.shape.cx;
				var y1 = start.position[1] + start.shape.cy;
				var points = pline.shape.points;
				points[0] = [x1, y1];
				pline.setShape('points', points);
				arrow.setShape('points', points.slice(-2));
			})
			end.follow.on('drag', function(){
				var x1 = end.position[0] + end.shape.cx;
				var y1 = end.position[1] + end.shape.cy;
				var points = pline.shape.points;
				points[1] = [x1, y1];
				pline.setShape('points', points);
				arrow.setShape('points', points.slice(-2));
			})
			this._zr.add(group);
		},
		_initElement: function () {
			var that = this;
			this._zr.on("mouseup", function (e) {
				that._helpLine.setShape('x1', 0);
				that._helpLine.setShape('x2', 0);
				that._helpLine.setShape('y1', 0);
				that._helpLine.setShape('y2', 0);
				that._lineCache.status = false;
			});
			
			this._zr.on("mousemove", function(e) {
				if(!that._lineCache.status) return;
				that._helpLine.setShape('x2',e.offsetX);
				that._helpLine.setShape('y2',e.offsetY);
			});

			var points = this._task.getPointObj();
			/* 点的拖动 start */
			util.each(points, function(point) {
				point.on("mousedown", function(e) {
					that._lineCache.start = point;
					that._lineCache.status = true;
					that._lineCache.context = that._task;
					that._helpLine.setShape('x1', point.shape.cx);
					that._helpLine.setShape('x2', point.shape.cx);
					that._helpLine.setShape('y1', point.shape.cy);
					that._helpLine.setShape('y2', point.shape.cy);
				})
				
				point.on("mouseup", function(e) {
					if(that._lineCache.status && that._lineCache.context != that._task) {				
						that._lineCache.end = point;
						that.drawLine(that._lineCache.start, that._lineCache.end);
					}
					that._helpLine.setShape('x1', 0);
					that._helpLine.setShape('x2', 0);
					that._helpLine.setShape('y1', 0);
					that._helpLine.setShape('y2', 0);
				})
			})
		}
	}

	return LineTo;
 })