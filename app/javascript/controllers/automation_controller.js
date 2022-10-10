import { Controller } from "@hotwired/stimulus"
import { useIntersection, useResize } from 'stimulus-use'
//import * as d3 from "d3"

export default class extends Controller {
  static targets = [ "name", "output", "animationField" ]
  static values = { index: Number, drawn: Boolean, currentWidth: Number, gearUrl: String }

  connect() {
    this.animationFieldTarget.style.height = this.animationFieldTarget.offsetWidth; + "px";

    this.currentWidthValue = this.animationFieldTarget.offsetWidth;

    import("d3").then(d3 => {
      window.d3 = d3;
      useIntersection(this)
      useResize(this)
    });


  }

  greet() {
    this.outputTarget.textContent =
      `Hello, ${this.nameTarget.value}!`
  }

  appear(entry){
    console.log("appear");
    if(!this.drawnValue){
      this.draw();
    }
  }

  resize({ width }) {
    console.log(this.currentWidthValue);
    console.log(width);
    console.log(this.currentWidthValue !== width)
    if(this.drawnValue && (this.currentWidthValue !== width)){
      console.log("WIDTH IS NOT SAME!");
      this.draw();
    }

  }

  draw(){
    console.log("automation");
    this.drawnValue = true;
    this.animationFieldTarget.innerHTML = "";
    let margin = {top: 5, right: 5, bottom: 5, left: 5};
    let width = this.animationFieldTarget.offsetWidth;//$(container).width();
    this.currentWidthValue = width;
    //var height = (this.data.length * 100) + 100 - margin.top - margin.bottom;
    let height = width; //this.animationFieldTarget.offsetHeight; //width;
    this.animationFieldTarget.style.height = width + "px";

    let box = {width: width/1.2, height: width/1.2};
    let gearUrl = this.gearUrlValue;
    let durationSpeed = 5000;

    let gear_size = {
      width: box.width/100 * 20,
      height: box.height/100 * 20
    }

    let gears_y = box.height/100 * 66;

    let gears = [
      {
        x: box.width/100 * 50,
        y: gears_y,
        cx: box.width/100 * 50 + gear_size.width/2,
        cy: gears_y + gear_size.height/2,
        id: "gear_1",
        class: "gears",
        rotating_class: "gears_rotate",
        group: undefined
      },
      {
        x: box.width/100 * 75,
        y: gears_y,
        cx: box.width/100 * 75 + gear_size.width/2,
        cy: gears_y + gear_size.height/2,
        id: "gear_2",
        class: "gears",
        rotating_class: "gears_rotate",
        group: undefined
      },
      {
        x: box.width/100 * 25,
        y: gears_y,
        cx: box.width/100 * 25 + gear_size.width/2,
        cy: gears_y + gear_size.height/2,
        id: "gear_3",
        class: "gears",
        rotating_class: "gears_rotate",
        group: undefined
      },
      {
        x: box.width/100 * 100,
        y: gears_y,
        cx: box.width/100 * 100 + gear_size.width/2,
        cy: gears_y + gear_size.height/2,
        id: "gear_3",
        class: "gears",
        rotating_class: "gears_rotate",
        group: undefined
      }
    ]

    // append the svg object to the body of the page
     const svg = d3.select(this.animationFieldTarget)
       .append("svg")
       .attr("width", width)
       .attr("height", height)
       .append("g")
       .attr("transform", `translate(${0}, ${margin.top})`);


       var assembly_line = svg.append('g')
                            .append('rect')
                            .attr('x', box.width/100 * 25 - gear_size.width/2)
                            .attr('y', gears_y - gear_size.height/1.5)
                            .attr('width', box.width)
                            .attr('height', 2.5)
                            .attr('stroke', 'black')
                            .attr('fill', 'black');


       for (let i = 0; i < gears.length; i++) {
         var group1 = svg.append('g')
                      .attr("transform", `translate(${gears[i]["x"]}, ${gears[i]["y"]})`)
                      ;

        var group2 = group1.append('g')
                      .attr("class", gears[i]["rotating_class"]);

        var group3 = group2
                   .append("svg:image")
                   .attr("transform", `translate(${-gear_size["width"]/2}, ${-gear_size["height"]/2})`)
                   .attr('id', "group3")
                   .attr('width', gear_size.width)
                   .attr('height', gear_size.height)
                   .style("cursor", "pointer")
                   .style("opacity", 1)
                   .attr("xlink:href", gearUrl);


         group2.append('circle')
                  .attr("transform", `translate(0,0)`)
                  .attr('r', box.height/100 * 1.2)
                  .attr('stroke', 'black')
                  .attr('fill', 'black');

        }



       function spin_geary(selector){
         var random_number = Math.floor(Math.random() * 360);

         d3.selectAll(selector)
         .transition()
         .ease(d3.easeLinear)
         .duration(3000)
         .attrTween('transform', function(){
           return d3.interpolateString( `rotate(0)`, `rotate(360)` )
         })
         .on("end", function(){
            spin_geary(".gears_rotate")
         });
       }

       spin_geary(".gears_rotate");

       svg.append('rect')
         .attr("x", 0)
         .attr("y", 0)
         .attr('width', 0)
         .attr('height', 0)
         .attr('fill', 'white')
         .transition()
           .duration(durationSpeed)
           .attr('width', box.width/3)
           .attr('height', box.height/2)
           .attr("fill", "#69a3b2");

       svg.append("text")
         .attr("font-weight", 500)
         .style("font-size", width/33)
         .style('fill', 'white')
         .style("opacity", 0)
         .attr("x", box.width/100 * 5)
         .attr("y", box.height/100 * 5)
         .text("Report 202")
         .transition()
               .duration(durationSpeed)
               .style("opacity", 1);


       //gears[0]["group"] = create_gear(gears[0]["x"], gears[0]["y"]);

       //spinGear(gears[0]);




       function create_gear(x,y){

         var gear_group = svg.append('g')
                            .attr("transform", `translate(${x}, ${y})`);

         gear_group.append('circle')
                  .attr("transform", `translate(${gear_size.width/2}, ${gear_size.height/2})`)
                  .attr('r', 3)
                  .attr('stroke', 'black')
                  .attr('fill', 'black');

          gear_group.append("svg:image")
                     //.attr("transform", `translate(${x}, ${y})`)
                     .attr('width', gear_size.width)
                     .attr('height', gear_size.height)
                     .style("cursor", "pointer")
                     .style("opacity", 0)
                     .attr("xlink:href", gearUrl)
                     .transition()
                           .duration(durationSpeed)
                           .style("opacity", 1);


         return gear_group;
       }


  } //end of draw
}
