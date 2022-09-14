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
    let durationSpeed = 500;

    // append the svg object to the body of the page
     const svg = d3.select(this.animationFieldTarget)
       .append("svg")
       .attr("width", width)
       .attr("height", height)
       .append("g")
       .attr("transform", `translate(${0}, ${margin.top})`);

        append_gear1();

        function append_gear1() {
          return new Promise(function(final_resolve, final_reject){

            var coordinates = {
              x: box.width/100 * 10,
              y: box.height/100 * 66
            }

            var gear_size = {
              width: 25,
              height: 25
            }

            svg.append('circle')
              .attr('cx', coordinates.x + gear_size.width/2)
              .attr('cy', coordinates.y + gear_size.height/2)
              .attr('r', 2)
              .attr('stroke', 'black')
              .attr('fill', '#69a3b2');

          const gear1 = svg.append('g')
            .attr("transform", `translate(${coordinates.x + gear_size.width/2}, ${coordinates.y + gear_size.height/2})`)
            .append("svg:image")
            .attr('width', gear_size.width)
            .attr('height', gear_size.height)
            .style("cursor", "pointer")
            .style("opacity", 0)
            .attr("xlink:href", gearUrl)
            .transition()
                  .duration(durationSpeed)
                  .style("opacity", 1)
            //.transition()
                  //.duration(3000)
                  //.attr("transform", `rotate(-90, ${box.width/2}, ${coordinates.y + gear_size.height/2})`)
                  //.on("end", function() {final_resolve()});

          //gear1.attr("transform", `translate(${box.width/100 * 1}, ${box.height/100 * 66}) rotate(2)`);

                function turnNeedle()
                {
                    gear1
                        .transition()
                        .duration(2000)
                        .attr('transform', `translate(0 0) rotate(-29 0 0)`)
                        //.attr("transform", `rotate(350)`);
                }

                turnNeedle();

          }) // end promise
        } // end append_first_gear

  } //end of draw
}
