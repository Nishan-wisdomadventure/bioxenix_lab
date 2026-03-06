gsap.registerPlugin(ScrollTrigger)

let down = false
function header_anim(){
    
    
    let button = document.querySelector('.button')
    button.addEventListener('click',()=>{
        if (down != true){
            document.querySelector('.header').style.transform = 'translate(0,0)'
            down = true
            button.style.rotate = '180deg'
            let mask = 0
            function loop(){
        
                    if(mask>window.innerWidth){
                        ever_opened=true
                        return
                    }
                    document.querySelector('.animation').style.mask = `radial-gradient(circle ${mask}px at center, transparent 70%, black)`
                    mask+=30
                    console.log("running")

                    requestAnimationFrame(loop)
                
            }

            requestAnimationFrame(loop)
        }
        else{
            document.querySelector('.header').style.transform = 'translate(0,-100%)'
            down = false
            button.style.rotate = '0deg'
        }
    })
}
header_anim()
function handle_gui(){

    document.querySelector('.button').addEventListener('mouseenter',()=>{
        if(!down){document.querySelector('.gui').style.backgroundColor = `black`
        document.querySelector('.gui2').style.backgroundColor = `black`
        document.querySelector('.gui').style.width = `${40*1.3}px`
        document.querySelector('.gui').style.height = `${40*1.3}px`
        document.querySelector('.gui2').style.width = `${70*1.3}px`
        document.querySelector('.gui2').style.height = `${70*1.3}px`}
        // document.querySelector('.button').style.animation = 'static'
        // document.querySelector('.button').style.scale = '2'
        // document.querySelector('.button').style.transform = `translate(0%,50%)`
    })
    document.querySelector('.button').addEventListener('mouseleave',()=>{
        if(!down){document.querySelector('.gui').style.backgroundColor = `rgb(255, 255, 255)`
        document.querySelector('.gui2').style.backgroundColor = `rgb(0, 255, 34)`
        document.querySelector('.gui').style.width = `${40*1}px`
        document.querySelector('.gui').style.height = `${40*1}px`
        document.querySelector('.gui2').style.width = `${70*1}px`
        document.querySelector('.gui2').style.height = `${70*1}px`}
        // document.querySelector('.button').style.scale = '1'
        // document.querySelector('.button').style.animation = 'heart-beat 3.5s infinite both ease-in-out'
    })

    let x_pos = 0
    let y_pos = 0

    function update_gui(){
        gsap.to('.gui',{
            x: x_pos + window.scrollX,
            y: y_pos + window.scrollY,
            duration: 0.1
        })

        gsap.to('.gui2',{
            x: x_pos + window.scrollX,
            y: y_pos + window.scrollY,
            duration: 0.3
        })
    }

    document.addEventListener('mousemove',(e)=>{
        x_pos = e.clientX
        y_pos = e.clientY
        update_gui()
    })

    document.addEventListener('scroll',()=>{
        update_gui()
    })
    
}
handle_gui()

function page_1_anim(){
    const square = document.querySelector(".page1-cover")

    // Temporarily reset scale to 1 to get correct width
    gsap.set(square, {scale: 1})
    const rect = square.getBoundingClientRect()

    // Calculate scale based on viewport width
    const scale = window.innerWidth / rect.width
    let tl = new gsap.timeline({
        scrollTrigger:{
            trigger:'.sticky-container',
            start: "10% top",
            end: "bottom bottom",
            scrub: true
        }
    })

    tl.from('.page1-cover',{
        left: "-50%",
        top:"50%",
        scale: 0.01,
        transform: `translate(-50%, -50%) rotate(0deg)`
    })
    tl.to('.page1-cover',{
        scale: scale*2,
        transform:'translate(-50%,-50%) rotate(90deg)'
    })
}
page_1_anim()


const lenis = new Lenis()

lenis.on('scroll', (e) => {
//   console.log(e)
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)