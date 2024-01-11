const lenis = new Lenis({
    lerp: 0.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  });
  
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  
  // Add a click event listener to the links you want to scroll smoothly
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
  
      if (targetElement) {
        lenis.scrollTo(targetElement.offsetTop);
      }
    });
  });
  
  requestAnimationFrame(raf);
  
  
//CURSOR DESIGN
  var cursor = document.querySelector('.cursor'),
      cursorScale = document.querySelectorAll('.cursor-scale'),
      mouseX = 0,
      mouseY = 0
  
  gsap.to({}, 0.016, {
      repeat: -1,
  
      onRepeat: function () {
          gsap.set(cursor, {
              css: {
                  left: mouseX,
                  top: mouseY
              }
          })
      }
  });
  
  window.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY
  });


//PRELOADER
function startLoader() {
    let counterElement = document.querySelector(".count h6");
    let currentValue = 0;

    function updateCounter(){
        if (currentValue < 100){
            let increment = Math.floor(Math.random()* 10) + 1;
            currentValue = Math.min (currentValue + increment, 100);
            counterElement.textContent = currentValue;

            let delay =Math.floor(Math.random() * 200) + 25;
            setTimeout (updateCounter, delay);
        }
    }
    updateCounter();
}
startLoader();

gsap.to(".count", {
    opacity: 0,
    delay: 3.5,
    duration: 0.5
});
const splitType = document.querySelectorAll('.ml16')

        splitType.forEach((char,i) => {
            const text = new SplitType(char, { types: 'chars'})

            gsap.from(".char", 1, {
                stagger:{
                    amount: .1,
                  },
                y: '-100%',
                ease: "power4.inOut"
            })
            gsap.to(".char", 1, {
                stagger:{
                    amount: .1,
                  },
                  delay: 3.5,
                y: '-100%',
                ease: "power4.inOut"
            })
        })

    gsap.to (".pre-loader",{
        scale: 0.5,
        ease: "power4.inOut",
        duration: 2,
        delay: 3
    })
    gsap.to (".pre-loader",{
        height: 0,
        ease: "power4.inOut",
        duration: 1.5,
        delay: 4,
        borderWidth: 0
    })
    gsap.to (".loader",{
        height: 0,
        ease: "power4.inOut",
        duration: 1.5,
        delay: 3.75
    })
    gsap.to (".loader-bg",{
        height: 0,
        ease: "power4.inOut",
        duration: 1.5,
        delay: 4
    })
    gsap.to(".container", {
        display: "none",
        delay: 5,
    })
    gsap.to("body", {
        top: 0,
        position: "fixed",
        duration: 3.8,
        ease: "power1.inOut",
      })
    // Reset the content back to its normal position after 7 seconds
    gsap.to("body", {
        top: "auto",
        position: "static",
        duration: 0.1,
        delay: 3.8,
        ease: "power4.inOut",
      });



//DISPLAY DATE AND TIME
function updateClock() {
    var now = new Date();

    //DISPLAY TIME
    var optionsTime = { timeZone: 'Asia/Manila', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    var phTime = now.toLocaleTimeString('en-US', optionsTime);
    document.getElementById('time').textContent = phTime;

    //DISPLAY MONTH & YEAR
    var optionsMonthYear = { timeZone: 'Asia/Manila', month: 'long', year: 'numeric' };
    var monthyear = now.toLocaleDateString('en-US', optionsMonthYear);
    document.getElementById('monthyear').textContent = monthyear;
}
    // Update the clock every second
    setInterval(updateClock, 1000);

    // Initial update
    updateClock();

//text-animation to big btext
const splitTypes = document.querySelectorAll('.reveal-type')

splitTypes.forEach((char,i) => {

    const bg = char.dataset.bgColor
    const fg = char.dataset.fgColor

    const text = new SplitType(char, { types: 'words'})

    gsap.fromTo(text.words, 
        {
            color: bg,
        },
        {
            color: fg,
            duration: 20,
            stagger: 10,
            scrollTrigger: {
                trigger: char,
                start: 'top 80%',
                end: 'bottom 50%',
                scrub: true,
                markers: false,
                toggleActions: 'play play reverse reverse'
            }
    })
});

//SERVICES HOVER ANIMATION
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const links = [...document.querySelectorAll('.services-h3-wrapper')];

function lerp(start, end, t){
    return start * (1 - t) + end * t;
}

let imgIndex = 0;
// Load images into an array for reference
const images = [
    './01-ASSETS/04-SERVICES/01-web-development.jpg',
    './01-ASSETS/04-SERVICES/04-branding.jpg',
    './01-ASSETS/04-SERVICES/05-logo-design.jpg',
    './01-ASSETS/04-SERVICES/06-photography.jpg'
]

let imgArr = [];

// Canvas mousemove variables

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener('mousemove', (e)=> {
    targetX = e.clientX;
    targetY = e.clientY;
})

images.forEach((image, idx) => {
    let elImage = new Image(400);
    elImage.src = image;
    elImage.classList.add('project-image');
    document.body.append(elImage);
    imgArr.push(elImage)
})

// Draw images to the canvas

let percent = 0;
let target = 0;

function drawImage(idx){
    let {width, height} = imgArr[idx].getBoundingClientRect();

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // pixelate by diabling the smoothing
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.msSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    if(target === 1){ // Link has been hovered
        // 2 speeds to make the effect more gradual
        if(percent < 1){
            percent += 1;
        }else if(percent < 1){
            percent += 1;
        }
    }else if(target === 0){
        if(percent > 1){
            percent -= 1
        }else if( percent > 0){
            percent -= 1;
        }
    }

    let scaledWidth = width * percent;
    let scaledHeight = height * percent;

    if(percent >= 1){
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        ctx.drawImage(imgArr[idx], 0, 0, width, height);
    }else{
        ctx.drawImage(imgArr[idx], 0, 0, scaledWidth, scaledHeight);
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        if(canvas.width !== 0 && canvas.height !== 0){
            ctx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, width, height)
        }
    }
}

for(let i = 0; i < links.length; i++){
    links[i].addEventListener('mouseover', () => {
        for(let j = 0; j < links.length; j++){
            if(j !== i){
                links[j].style.opacity = 0.5;
                links[j].style.zIndex = 0;
            }else{
                links[j].style.opacity = 1;
                links[j].style.zIndex = 3;
            }
        }
    })

    links[i].addEventListener('mouseleave', () => {
        for(let i = 0; i < links.length; i++){
            links[i].style.opacity = 1;
        }
    })

    links[i].addEventListener('mouseenter', () => {
        imgIndex = i;
        target = 1
    });

    links[i].addEventListener('mouseleave', () => {
        target = 0;
    })
}

function animate(){
    currentX = lerp(currentX, targetX, 0.075);
    currentY = lerp(currentY, targetY, 0.075);
    let { width, height} = imgArr[imgIndex].getBoundingClientRect();
    canvas.style.transform = `translate3d(${currentX - (width / 2)}px, ${currentY - (height / 2)}px, 0)`;
    drawImage(imgIndex);
    window.requestAnimationFrame(animate);
}

animate();

//ANIMATIONS
gsap.from(".services-h3-wrapper h3", 1.5, {
    scrollTrigger: {
        trigger: ".services",
        scrub: false,
        pin: false,
        start: "top bottom",
        end: "+=100%",
    },
    y: '100%',
    ease: "power4.inOut",
    stagger:{
        amount: 0.5,
    },
  });

  gsap.from(".line-03", 5, {
    scrollTrigger: {
    trigger: ".line-03",
    scrub: false,
    pin: false,
    start: "top bottom",
    },
    scaleX: 0, 
    transformOrigin: "left center", 
    ease: "power4.inOut"
});

gsap.from(".footer-h3-wrapper h3, .with-button, .footer-description p", 1.5, {
    scrollTrigger: {
        trigger: ".footer",
        scrub: false,
        pin: false,
        start: "top 20%",
        end: "+=100%",
    },
    y: '100%',
    ease: "power4.inOut",
    stagger:{
        amount: 0.5,
    },
});
