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


       // guidodiepen.nl


       var group1 = svg.append('g')
                    .attr('id', "group1")
                    .attr("transform", `translate(${gears[0]["x"]}, ${gears[0]["y"]})`)
                    ;

      var group2 = group1.append('g')
                    .attr('id', "group2")
                    //.attr("transform", `translate(${-gear_size["width"]/2}, ${-gear_size["height"]/2})`)

                    //.attr("transform", `translate(${gears[0]["x"]}, ${gears[0]["y"]})`)
                    ;



     var group4 = group2
                .append("svg:image")
                .attr("transform", `translate(${-gear_size["width"]/2}, ${-gear_size["height"]/2})`)
                .attr('id', "group4")
                .attr('width', gear_size.width)
                .attr('height', gear_size.height)
                .style("cursor", "pointer")
                .style("opacity", 1)
                .attr("xlink:href", gearUrl);


       function spin_geary(){
         var random_number = Math.floor(Math.random() * 360);

         //console.log("random_number");
        // console.log(random_number);

        //random_number = 360;

         d3.select("#group2")
         .transition()
         .ease(d3.easeLinear)
         .duration(2000)
         .attrTween('transform', function(){
           return d3.interpolateString( `rotate(0)`, `rotate(360)` )
         })
         .transition()
         .ease(d3.easeLinear)
         .duration(0)
         .attr('transform' , "rotate(0)")
         .transition()
         .ease(d3.easeLinear)
         .duration(1500)
         .attr('transform' , "rotate(-300)")
         .on("end", spin_geary);
       }

       spin_geary();

       function animateTriangle(){
            d3.select("#g_rotate")
                .transition()
                .duration(2500)
                .attr('transform' , "rotate(-180)")

                .transition() //And rotate back again
                .duration(2500)
                .attr('transform' , "rotate(-180)")
                .on("end", animateTriangle);  //at end, call it again to create infinite loop
        }

        //And just call the animateTriangle function now
        animateTriangle();


       // end guidodiepen.nl





       gears[0]["group"] = create_gear(gears[0]["x"], gears[0]["y"]);

       spinGear(gears[0]);

       function spinGear(gear)
       {

        svg.append('circle')
                  .attr("transform", `translate(${gear["x"]}, ${gear["y"]})`)
                  .attr('r', 3)
                  .attr('stroke', 'red')
                  .attr('fill', 'red');

           gear["group"]
                .attr("transform", `translate(0, 0)`)
               .transition()
               .ease(d3.easeLinear)
               .duration(1000)

            //   .attr("transform", `translate(${gear["cx"]},${gear["cy"]}) rotate(${Math.floor(Math.random() * 360)})`)
            //   .attr("transform", `translate(${gear["x"]}, ${gear["y"]}) rotate(-620)`)
            //   .transition()
            //   .duration(2000)
            //   .attr("transform", `translate(${gear["x"]}, ${gear["y"]}) rotate(720)`);;
               //+.attr("transform", `translate(${gear["x"]}, ${gear["y"]})`)
               .attrTween('transform', function(){
                 return d3.interpolateString( `rotate(0,${gear_size["width"]/2},${gear_size["height"]/2})`, `rotate(60,${gear_size["width"]/2},${gear_size["height"]/2})` )
               })
               .on("end", function(){
                 spinGear(gear);
               });

       }



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
