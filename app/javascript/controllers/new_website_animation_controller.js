import { Controller } from "@hotwired/stimulus"
import { useIntersection, useResize } from 'stimulus-use'
//import * as d3 from "d3"

export default class extends Controller {
  static targets = [ "name", "output", "animationField" ]
  static values = { index: Number, drawn: Boolean, currentWidth: Number, svgUrl: String, cardTextUrl: String, listTaskUrl: String, imageUrl: String, textCenterUrl: String }

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

    if(!this.drawnValue){
      this.draw();
    }
  }

  resize({ width }) {

    if(this.currentWidthValue !== width){
      this.draw();
    }

  }

  draw(){
    this.drawnValue = true;
    this.animationFieldTarget.innerHTML = "";
    let margin = {top: 5, right: 5, bottom: 5, left: 5};
    let width = this.animationFieldTarget.offsetWidth;//$(container).width();
    this.currentWidthValue = width;
    //var height = (this.data.length * 100) + 100 - margin.top - margin.bottom;
    let height = width; //this.animationFieldTarget.offsetHeight; //width;
    this.animationFieldTarget.style.height = width + "px";

    let box = {width: width/1.5, height: width/1.5};
    let svgUrl = this.svgUrlValue;
    let cardTextUrl = this.cardTextUrlValue;
    let listTaskUrl = this.listTaskUrlValue;
    let imageUrl = this.imageUrlValue;
    let textCenterUrl = this.textCenterUrlValue;

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
            .duration(1000)
            .attr('width', box.width)
            .attr('height', box.height)
            .attr("fill", "#69a3b2")
            .on("end", function() {
              //append_navbar(append_title)
              append_navbar()
              .then(() => append_sections())
              .then(() => append_navbar_brand())
              .then(() => append_navbar_menu())
              .then(() => append_title())
              .then(() => append_button())
              .then(() => console.log("finish"));
            });
            // end website_screen

    function append_sections() {
      return new Promise(function(final_resolve, final_reject){

        website_screen.append('rect')
          .attr("x", 0)
          .attr("y", box.height/100 * 22.5)
          .attr('width', box.width)
          .attr('height', 0)
          .attr('fill', 'white')
          .transition()
            .duration(1000)
            .attr('width', box.width)
            .attr('height', box.height/100 * 25)
            .attr("fill", "LightBlue")
            .on("end", function() {final_resolve()});


        website_screen.append('rect')
          .attr("x", 0)
          .attr("y", box.height/100 * 75)
          .attr('width', box.width)
          .attr('height', 0)
          .attr('fill', 'white')
          .transition()
            .duration(1000)
            .attr('width', box.width)
            .attr('height', box.height/100 * 25)
            .attr("fill", "LightBlue")
            .on("end", function() {final_resolve()});


      }) //end Promise
    } // end append_sections

    function append_title() {

      return new Promise(function(final_resolve, final_reject){

        website_screen.append("foreignObject")
          .attr("x", box.width/100 * 0)
          .attr("y", box.height/100 * 10)
          .attr('width', box.width/100 * 100)
          .attr('height', box.height/100 * 15)
          .append("xhtml:div")
          .attr("class", "")
          .style("opacity", 0.0)
          .html(`<div class="text-center text-white"><h4><b>Willkommen!</b></h4></div>`)
          .transition()
                .duration(1000)
                .style("opacity", 1.0)
                .on("end", function() {final_resolve()});


            })
    }

    function append_navbar(){

      return new Promise(function(final_resolve, final_reject){
        website_screen.append('rect')
          .attr("x", 0)
          .attr("y", 0)
          .attr('width', 0)
          .attr('height', 0)
          .attr('fill', 'gray')
          .transition()
            .duration(1000)
            .attr('width', box.width/100 * 100)
            .attr('height', box.height/100 * 7.5)
            .on("end", function() {final_resolve()});
      })

    }

    function append_navbar_menu(){

      return new Promise(function(final_resolve, final_reject){
        website_screen.append('rect')
          .attr("x", box.width/100 * 90)
          .attr("y", box.width/100 * 1.5)
          .attr('width', 0)
          .attr('height', 0)
          .attr('fill', 'white')
          .transition()
            .duration(1000)
            .attr('width', box.width/100 * 6)
            .attr('height', box.height/100 * 1)
            .on("end", function() {});

          website_screen.append('rect')
            .attr("x", box.width/100 * 90)
            .attr("y", box.width/100 * 3.5)
            .attr('width', 0)
            .attr('height', 0)
            .attr('fill', 'white')
            .transition()
              .duration(1000)
              .attr('width', box.width/100 * 6)
              .attr('height', box.height/100 * 1)
              .on("end", function() {});

            website_screen.append('rect')
              .attr("x", box.width/100 * 90)
              .attr("y", box.width/100 * 5.5)
              .attr('width', 0)
              .attr('height', 0)
              .attr('fill', 'white')
              .transition()
                .duration(1000)
                .attr('width', box.width/100 * 6)
                .attr('height', box.height/100 * 1)
                .on("end", function() {final_resolve()});
      })

    }

    function append_navbar_brand(){

      return new Promise(function(final_resolve, final_reject){

        website_screen.append("svg:image")
        .attr('x', box.width/100 * 1)
        .attr('y', box.height/100 * 1)
        .attr('width', box.width/100 * 10)
        .attr('height', box.height/100 * 4.5)
        .style("cursor", "pointer")
        .style("opacity", 1)
        .attr("xlink:href", svgUrl);


        website_screen.append("text")
          .attr("font-weight", 500)
          .style("font-size", width/33)
          .style('fill', 'white')
          .attr("x", 0)
          .attr("y", 0)
          .text("Logo")
          .transition()
                .duration(1000)
                .attr("x", box.width/100 * 10)
                .attr("y", box.height/100 * 5)
                .on("end", function() {final_resolve()});
      })

    }

    function append_button() {

      return new Promise(function(final_resolve, final_reject){


        website_screen.append("svg:image")
        .attr('x', box.width/100 * 40)
        .attr('y', box.height/100 * 25)
        .attr('width', box.width/100 * 20)
        .attr('height', box.height/100 * 20)
        .style("cursor", "pointer")
        .style("opacity", 0)
        .attr("xlink:href", textCenterUrl)
        .transition()
              .duration(1000)
              .style("opacity", 1)
              .on("end", function() {final_resolve()});

        website_screen.append("svg:image")
        .attr('x', box.width/100 * 10)
        .attr('y', box.height/100 * 50)
        .attr('width', box.width/100 * 20)
        .attr('height', box.height/100 * 20)
        .style("cursor", "pointer")
        .style("opacity", 0)
        .attr("xlink:href", listTaskUrl)
        .transition()
                      .duration(1000)
                      .style("opacity", 1)
                      .on("end", function() {});

        website_screen.append("svg:image")
        .attr('x', box.width/100 * 40)
        .attr('y', box.height/100 * 50)
        .attr('width', box.width/100 * 20)
        .attr('height', box.height/100 * 20)
        .style("cursor", "pointer")
        .style("opacity", 0)
        .attr("xlink:href", cardTextUrl)
        .transition()
                      .duration(1000)
                      .style("opacity", 1)
                      .on("end", function() {});

        website_screen.append("svg:image")
        .attr('x', box.width/100 * 70)
        .attr('y', box.height/100 * 50)
        .attr('width', box.width/100 * 20)
        .attr('height', box.height/100 * 20)
        .style("cursor", "pointer")
        .style("opacity", 0)
        .attr("xlink:href", imageUrl)
        .transition()
                      .duration(1000)
                      .style("opacity", 1)
                      .on("end", function() {});

      const button = website_screen.append('g')
        .attr("transform", `translate(${box.width/100 * 25}, ${box.height/100 * 80})`);

      //var button = website_screen.append('rect');



          button.append("foreignObject")
            .attr("x", 0)
            .attr("y", 0)
            .attr('width', box.width/100 * 50)
            .attr('height', box.height/100 * 15)
            .append("xhtml:div")
            .attr("class", "")
            .style("opacity", 1.0)
            .html(`<div class="text-center"><button type="button" class="btn btn-light">Loslegen!</button></div>`);

        })
    }




  } //end of draw
}
