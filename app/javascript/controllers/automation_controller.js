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

    let box = {width: width/1.5, height: width/1.5};
    let gearUrl = this.gearUrlValue;
    let durationSpeed = 5000;

    let gear_size = {
      width: 50,
      height: 50
    }

    let gears = [
      {
        x: box.width/100 * 50,
        y: box.height/100 * 33,
        cx: box.width/100 * 50 + gear_size.width/2,
        cy: box.height/100 * 33 + gear_size.height/2,
        id: "gear_1",
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


       for (let i = 0; i < gears.length; i++) {
         var group1 = svg.append('g')
                      .attr("transform", `translate(${gears[0]["x"]}, ${gears[0]["y"]})`)
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
                  .attr('r', 3)
                  .attr('stroke', 'black')
                  .attr('fill', 'black');

        }



       function spin_geary(selector){
         var random_number = Math.floor(Math.random() * 360);

         d3.select(selector)
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
