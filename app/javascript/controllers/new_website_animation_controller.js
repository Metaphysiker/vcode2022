import { Controller } from "@hotwired/stimulus"
import { useIntersection, useResize } from 'stimulus-use'
//import * as d3 from "d3"

export default class extends Controller {
  static targets = [ "name", "output", "animationField" ]
  static values = { index: Number, drawn: Boolean, currentWidth: Number }

  connect() {
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
    console.log(this.drawnValue);
    if(!this.drawnValue){
      this.draw();
    }
  }

  resize({ width }) {
    console.log(width);
    console.log(this.animationFieldTarget.offsetWidth);
    console.log("resize");
    if(this.currentWidthValue !== width){
      this.draw();
    }

  }

  draw(){
    this.drawnValue = true;
    this.animationFieldTarget.innerHTML = "";
    let margin = {top: 50, right: 50, bottom: 50, left: 50};
    let width = this.animationFieldTarget.offsetWidth;//$(container).width();
    this.currentWidthValue = width;
    //var height = (this.data.length * 100) + 100 - margin.top - margin.bottom;
    let height = this.animationFieldTarget.offsetHeight; //width;

    let box = {width: width/1.5, height: width/1.5};

    // append the svg object to the body of the page
     const svg = d3.select(this.animationFieldTarget)
       .append("svg")
       .attr("width", width)
       .attr("height", height)
       .append("g")
       .attr("transform", `translate(${width/2}, ${margin.top})`);

       const website_screen = svg.append('g')
                        .attr("transform", `translate(${-box.width/2}, ${0})`);

        website_screen.append('rect')
          .attr("x", 0)
          .attr("y", 0)
          .attr('width', 0)
          .attr('height', 0)
          .attr('fill', 'white')
          .transition()
            .duration(2000)
            .attr('width', box.width)
            .attr('height', box.height)
            .attr("fill", "#69a3b2")
            .on("end", function() {console.log("end")});
            // end website_screen


  } //end of draw
}
