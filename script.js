function header_anim(){
    let down = false
    
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
