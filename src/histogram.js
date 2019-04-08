

function histogram(id ,dataset){


var svg = d3.select(id).append("svg");

var width = $(id).width();
var height = 400;
		svg.attr("width", width)
		.attr("height", height);

var padding = {left:30, right: 30, top:20, bottom:20};



var xScale = d3.scale.ordinal()
			.domain(d3.range(dataset.length))
			.rangeRoundBands([0, width - padding.left - padding.right]);

var yScale = d3.scale.linear()
			.domain([0, d3.max(dataset)])
			.range([height - padding.top - padding.bottom, 0]);

var colorScale = d3.scale.linear()
				.domain([0, d3.max(dataset)])
				.range(['#20622F','#E5973D']);
//var color = d3.interpolate('red','green');

var xAxis = d3.svg.axis()
			.scale(xScale)
			.orient("bottom");

var yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("left");

var rectPadding = 5;

var detail = d3.select(id).append("rect")
			.attr("class","details")
			.attr("width",100)
			.attr("height",100)
			.style("display","none")
			.style("border","3px solid gray");

var rects = svg.selectAll(".rects")
			.data(dataset)
			.enter()
			.append("rect")
			.attr("class","rects")
			.attr("class", function(d){
				if(d > d3.max(dataset)/2){
					return "High";
				}
				else{
					return "Low";
				}
			})
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
			.on("mouseover", function(d,i){
				d3.select(this)
					.attr("fill",'yellow');

			})
			.on("mouseout",function(d,i){
				d3.select(this)
					.transition()
					.duration(800)
					.attr("fill",colorScale(d));
			})
			.transition()
			.delay(function(d,i){
				return i*200;
			})
			.duration(2000)
			.ease("bounce")
			.attr("y", function(d){
				return yScale(d);
			})
			.attr("fill", function(d){
				return colorScale(d);
			})
			.attr("height", function(d){
				return height - padding.top - padding.bottom - yScale(d);
			});
	

		var text = svg.selectAll(".texts")
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

				svg.append("g")
					.attr("class","axis")
					.attr("transform","translate("+padding.left+","+(height-padding.bottom)+")")
					.call(xAxis);

				svg.append("g")
					.attr("class","axis")
					.attr("transform","translate("+padding.left+","+padding.top+")")
					.call(yAxis);


}
