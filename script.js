 var DataExemple; // All the Json object
 var DataArray;   // Only the data
var DataScore;   // Only the score
var Download=false;
var canvas;
var Rect;
var Rect2;
var RectScore=new Array();   
var texte;
var width  = 1000;
var height = 1000;
var x = d3.scaleLinear()
  .domain([0,100])
  .range([0,500]);
var y = d3.scaleLinear()
  .domain([10,0])
  .range([0,500]);
var x2 = d3.scaleLinear()
  .domain([100,0])
  .range([0,500]);
          

canvas = d3.select("body")
  .append("svg")
  .attr("width",width)
  .attr("height",height)
  .append("g")
  .attr("transform","translate(50,50)")
  .attr("fill","#202020");

var xAxisCall = d3.axisBottom(x)
var yAxisCall2 = d3.axisLeft(x2)

var yAxisCall =  d3.axisLeft(y)
  .tickFormat(function(d){ return "$" + d; });
canvas.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0,600)")
  .call(xAxisCall);
canvas.append("g")
  .attr("class", "y axis")
  .call(yAxisCall)
  .attr("transform", "translate(0,100)");
  
canvas.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(550,100)")
  .call(yAxisCall2);

var request = new XMLHttpRequest();
request.open("GET","  https://4v9r83qfo4.execute-api.eu-central-1.amazonaws.com/dev",true);
request.send();
request.onload = function() {
  DataExemple = JSON.parse(request.response);
  DataArray = DataExemple.data;
  DataScore = DataExemple.scores;
  Download = true;
  };

function Rectangle(){
  if (Download==false) {
    alert("The data is not download yet");
    setTimeout(function(){Rectangle();},1000);
  }else{
    Rect=canvas.selectAll("rect2")
      .data(DataArray)
      .enter()
      .append("rect")
      .attr("x", function(d) { return d[0]*5;})
      .attr("height", function(d) {return d[1]*50; })
      .attr("y", function(d) {return 600-d[1]*50;})
      .attr("width", 10)
      .attr("fill","#202020");
                           

    RectScore[0]=DataScore.a;
    RectScore[1]=DataScore.b;
    RectScore[2]=DataScore.c;                                
    Rect2=canvas.selectAll("rect3")
      .data(RectScore)
      .enter()
      .append("rect")
      .attr("x",function(d,i){return 600+100*i;})
      .attr("height",function(d){return d*500/100;})
      .attr("y", function(d){return 600-d*500/100;})
      .attr("width", 60)
      .attr("fill","#202020");
    
    var texte2  =canvas.append("text")
      .attr("x",600+31)
      .attr("y",620)
      .attr("dy", ".35em")
      .attr("font-size", 60)
      .text(  "a" )
      .attr("font-family","bold")
      .attr("fill","#202020");
    var texte3  =canvas.append("text")
      .attr("x",700+31)
      .attr("y",620)
      .attr("dy", ".35em")
      .attr("font-size", 40)
      .text(  "b" )
      .attr("font-family","bold")
      .attr("fill","#202020");
    var texte4  =canvas.append("text")
      .attr("x",800+31)
      .attr("y",620)
      .attr("dy", ".35em")
      .attr("font-size", 40)
      .text(  "c" )
      .attr("font-family","bold")
      .attr("fill","#202020"); 
    var texte5  =canvas.append("text")
      .attr("x",35)
      .attr("y",120)
      .attr("dy", ".35em")
      .attr("font-size", 40)
      .text(  "data" )
      .attr("font-family","bold")
      .attr("fill","#202020");
    var texte6  =canvas.append("text")
      .attr("x",600)
      .attr("y",120)
      .attr("dy", ".35em")
      .attr("font-size", 40)
      .text(  "scores" )
      .attr("font-family","bold")
      .attr("fill","#202020");
              
    Rect.on("mouseover", function(d) {
      d3.select(this)
        .style('fill', 'goldenrod');                  
      texte=canvas.append("text")
        .attr("x",this.x.baseVal.value-30+this.width.baseVal.value/2+11)
        .attr("y",this.y.baseVal.value-45+10)
        .attr("dy", ".35em")
        .attr("font-size", 20)
        .text(  this.x.baseVal.value/5 + "|" + this.height.baseVal.value/50)
        .attr("font-family","bold")
        .attr("fill","goldenrod")
        .transition()
        .duration(1000);
    });
    Rect.on('mouseout', function() {
      d3.select(this)
        .transition()
        .duration(1000)
        .style('fill', '#202020');
      texte.transition()
        .remove()                            
    });

    Rect2.on("mouseover", function(d) {
      d3.select(this)
        .style('fill', 'goldenrod');                                                             
      texte=canvas.append("text")
        .attr("x",this.x.baseVal.value-30+this.width.baseVal.value/2+11)
        .attr("y",this.y.baseVal.value-45+10)
        .attr("dy", ".35em")
        .attr("font-size", 40)
        .text(  this.height.baseVal.value/5 )
        .attr("font-family","bold")
        .attr("fill","goldenrod")
        .transition()
        .duration(1000);
    })
    Rect2.on('mouseout', function() {
      d3.select(this)
      .transition()
      .duration(1000)
      .style('fill', '#202020');
      texte.transition()
      .remove();
    });
  }
}

Rectangle();