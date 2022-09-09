import { Controller } from "@hotwired/stimulus"
import { useIntersection, useResize } from 'stimulus-use'
//import * as d3 from "d3"

var current_width = 0;

export default class extends Controller {
  static targets = [ "name", "output", "animationField" ]



  connect() {

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
    this.draw();
  }

  resize({ width }) {
    console.log("resize");
    if(current_width !== this.animationFieldTarget.offsetWidth){
      this.draw();
    }

  }

  draw(){
    current_width = this.animationFieldTarget.offsetWidth;
    this.animationFieldTarget.innerHTML = "";
    let margin = {top: 50, right: 50, bottom: 50, left: 50};
    let width = this.animationFieldTarget.offsetWidth;//$(container).width();
    //var height = (this.data.length * 100) + 100 - margin.top - margin.bottom;
    let height = width;

    let box = {width: width/1.5, height: width/1.5};

    // append the svg object to the body of the page
     const svg = d3.select(this.animationFieldTarget)
       .append("svg")
       .attr("width", width)
       .attr("height", height)
       .append("g")
       .attr("transform", `translate(${width/2}, ${margin.top})`);
  }
}
