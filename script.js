let underLayingImage = document.querySelector('.blury-image')
let blurLimit = 30;
let isBlurryActive = false
let bluryImgHeight;
let bluryImgSectionLimit;
let fullSectionHeight;
let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            bluryImgHeight = underLayingImage.getBoundingClientRect().height
            bluryImgSectionLimit = bluryImgHeight + document.documentElement.scrollTop
            fullSectionHeight = (bluryImgHeight * 2) + document.documentElement.scrollTop
            console.log("Blurry Image height",bluryImgHeight)
            console.log("Blurry Image Section Limit ",bluryImgSectionLimit)
            console.log("Full Section Limit ",fullSectionHeight)
            isBlurryActive = true
            window.addEventListener('scroll',()=> {
                let scrollTop = document.documentElement.scrollTop
                if( scrollTop >= bluryImgSectionLimit - bluryImgHeight && scrollTop <= fullSectionHeight) {
                    console.log("Blurry Image touched!")
                    let bluryImage = document.querySelector('.image-transition .blury-image')
                    // console.log("Client Rect",bluryImage.getBoundingClientRect())
                    let dividend = bluryImgSectionLimit - scrollTop 
                    let divisor = bluryImgHeight
                    let blurValue =blurLimit -((dividend / divisor ) * blurLimit )
                    if(scrollTop > bluryImgSectionLimit) {
                        
                        dividend = fullSectionHeight - scrollTop 
                        divisor = fullSectionHeight - bluryImgSectionLimit
                        blurValue =((dividend / divisor ) * blurLimit )
                    } 
                    bluryImage.style.filter = `blur(${blurValue}px)`
                }

            })

        }
        else {
            isBlurryActive = false
        }
    })
},{threshold: 0,rootMargin: "0px 0px -100% 0px"})
observer.observe(underLayingImage)




window.addEventListener('scroll',(e)=> {
    // console.log(document.documentElement.scrollTop)
    let scrollTop = document.documentElement.scrollTop
    if(scrollTop <= 650) {
        let heroBlurMask = document.querySelector('.para-section .blur-mask')
        let blurValue = blurLimit- ((scrollTop / 650 ) * blurLimit )// current blur value is 20px
        heroBlurMask.style.backdropFilter = `blur(${blurValue}px)`
    }
    else if( scrollTop >= bluryImgSectionLimit - bluryImgHeight && scrollTop <= fullSectionHeight && isBlurryActive) {
                    console.log("Blurry Image touched!")
                    let bluryImage = document.querySelector('.image-transition .blury-image')
                    // console.log("Client Rect",bluryImage.getBoundingClientRect())
                    let dividend = bluryImgSectionLimit - scrollTop 
                    let divisor = bluryImgHeight
                    let blurValue =blurLimit -((dividend / divisor ) * blurLimit )
                    if(scrollTop > bluryImgSectionLimit) {
                        
                        dividend = fullSectionHeight - scrollTop 
                        divisor = fullSectionHeight - bluryImgSectionLimit
                        blurValue =((dividend / divisor ) * blurLimit )
                    } 
                    bluryImage.style.filter = `blur(${blurValue}px)`
                }
})

const testimonialCarouselContainer = document.querySelector('.testimonials')
function scrollTestimonialContainer(index) {
    let scrollingWidth = testimonialCarouselContainer.clientWidth *index
    testimonialCarouselContainer.scrollTo({
        left: scrollingWidth,
        behavior: "smooth"
    })
}



let testimonialCarouselNavDots = document.querySelectorAll(".navigation-dots ul li button")
testimonialCarouselNavDots.forEach((dot,index) => {
    dot.addEventListener('click',(e)=> {
        console.log("clicked!")
        if(!e.target.classList.contains('active')){
            console.log("Hey!")
            let activeDot = document.querySelector(".navigation-dots ul li button.active")
            activeDot.classList.remove('active')
            scrollTestimonialContainer(index)
            e.target.classList.add('active')

        }
    })
    // dot.classList.toggle('active',)
})