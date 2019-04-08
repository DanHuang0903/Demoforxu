

function input(id ,dataset){


//
var width = $(id).width();
var height = 400;


var padding = {left:30, right: 30, top:20, bottom:20};



var xScale = d3.scale.ordinal()
			.domain(d3.range(dataset.length))
			.rangeRoundBands([0, width - padding.left - padding.right]);

var yScale = d3.scale.linear()
			.domain([0, 40])
			.range([height - padding.top - padding.bottom, 0]);

var colorScale = d3.scale.linear()
				.domain([0, 40])
				.range(['#20622F','#E5973D']);
//var color = d3.interpolate('red','green');



var rectPadding = 20;


var rects = d3.select(id).select("svg").selectAll(".input")
			.data(dataset)
			.enter()
			.append("rect")
			.attr("class","input")
			.attr("transform","translate("+padding.left+","+padding.top+")")
			.attr("x", function(d,i){
				return xScale(i) + rectPadding/2;
			})
			.attr("y",function(d){
				var min = yScale.domain()[0];
				return yScale(min);
			})
			.attr("width", xScale.rangeBand() - rectPadding)
			.attr("height", function(d){
				return 0;
			})
			.attr("opacity", 0.8)
			.transition()
			.delay(function(d,i){
				return i*200;
			})
			.duration(2000)
			.ease("bounce")
			.attr("y", function(d){
				return yScale(d);
			})
			.attr("fill", "pink")
			.attr("height", function(d){
				return height - padding.top - padding.bottom - yScale(d);
			});
	

		var text = d3.select(id).select("svg").selectAll(".texts")
					.data(dataset)
					.enter()
					.append("text")
					.attr("class", "texts")
					.attr("transform", "translate("+padding.left+","+padding.top+")")
					.attr("x",function(d,i){
						return xScale(i) + rectPadding/2;
					})
					.attr("y", function(d){
						var min = yScale.domain()[0]
						return yScale(min);
					})
					.attr("dx", function(){
						return (xScale.rangeBand() - rectPadding)/2.7;
					})
					.attr("dy", function(d){
						return 20
					})
					.text(function(d){
						return 'value:' + d;
					})
					.transition()
					.delay(function(d,i){
						return i*200;
					})
					.duration(2000)
					.ease("bounce")
					.attr("y", function(d){
						return yScale(d);
					});

	


}