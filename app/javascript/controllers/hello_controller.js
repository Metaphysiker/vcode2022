import { Controller } from "@hotwired/stimulus"
import { useIntersection, useResize } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useIntersection(this)
    useResize(this)
    this.element.textContent = "Hello World!"
  }

  appear(entry){
    console.log("GOOOO");
  }
}
