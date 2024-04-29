gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
  multiplier:.4
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


var tl1 = gsap.timeline({
       scrollTrigger:{
        trigger:"#page1",
        scroller:"#main",
        // markers:true,
        start:"top -75.5%",
        end:"top -150%",
        pin:true,
        scrub:2,  
       }
})

tl1.to("#part-2", {
  width:"100vw",
},"anim")

tl1.to("#part-1", {
  x:-400
},"anim")

tl1.to("#part-3", {
  x:400
},"anim")

tl1.from("#image-container h1",{
  y:500
})

gsap.to("#main", {
  backgroundColor:"white",
  scrollTrigger:{
    trigger:"#page3",
    scroller:"#main",
    // markers:true,
    start:"top 10%",
    end:"top 5%",
    pin:true,
    scrub:2,  
   }     
})


// SCROLLING EFFECT JS

var allrow = document.querySelector(".row1")
var row2 = document.querySelector(".row2")

function split(){
    var clutter1 = "";
    var clutter2 = "";
    allrow.textContent.split(" ").forEach(function(char){
      clutter1 += `<span>${char}</span>`})

      row2.textContent.split(" ").forEach(function(char){
        clutter2 += `<span>${char}</span>` })

    allrow.innerHTML = clutter1;
    row2.innerHTML = clutter2
  }

  split()

  // END OF EFFECT JS

  // part2

  var part2row1 = document.querySelector(".part2-row1")
var row2 = document.querySelector(".part2-row2")

function split2(){
    var clutter3 = "";
    var clutter4 = "";
    part2row1.textContent.split(" ").forEach(function(char){
      clutter3 += `<span>${char}</span>`})

      row2.textContent.split(" ").forEach(function(char){
        clutter4 += `<span>${char}</span>` })

    part2row1.innerHTML = clutter3;
    row2.innerHTML = clutter4
  }

  split2()

// END OF EFFECT JS


// grab to scroll effect js

const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX); //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});


// end of grab to scroll effect
