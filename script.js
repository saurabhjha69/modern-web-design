let underLayingImage = document.querySelector('.blury-image')
let blurLimit = 30;
let isBlurryActive = false
let bluryImgHeight;
let bluryImgSectionLimit;
let fullSectionHeight;
let topObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            bluryImgHeight = underLayingImage.getBoundingClientRect().height
            bluryImgSectionLimit = bluryImgHeight + document.documentElement.scrollTop
            fullSectionHeight = (bluryImgHeight * 2) + document.documentElement.scrollTop
            console.log("Blurry Image height",bluryImgHeight)
            console.log("Blurry Image Section Limit ",bluryImgSectionLimit)
            console.log("Full Section Limit ",fullSectionHeight)
            isBlurryActive = true
            // window.addEventListener('scroll',()=> {
            //     let scrollTop = document.documentElement.scrollTop
            //     if( scrollTop >= bluryImgSectionLimit - bluryImgHeight && scrollTop <= fullSectionHeight) {
            //         console.log("Blurry Image touched!")
            //         let bluryImage = document.querySelector('.image-transition .blury-image')
            //         // console.log("Client Rect",bluryImage.getBoundingClientRect())
            //         let dividend = bluryImgSectionLimit - scrollTop 
            //         let divisor = bluryImgHeight
            //         let blurValue =blurLimit -((dividend / divisor ) * blurLimit )
            //         if(scrollTop > bluryImgSectionLimit) {
                        
            //             dividend = fullSectionHeight - scrollTop 
            //             divisor = fullSectionHeight - bluryImgSectionLimit
            //             blurValue =((dividend / divisor ) * blurLimit )
            //         } 
            //         bluryImage.style.filter = `blur(${blurValue}px)`
            //     }

            // })

        }
        else {
            isBlurryActive = false
        }
    })
},{threshold: 1})
topObserver.observe(underLayingImage)




window.addEventListener('scroll',(e)=> {
    // console.log(document.documentElement.scrollTop)
    let scrollTop = document.documentElement.scrollTop
    if(scrollTop <= 650) {
        let heroBlurMask = document.querySelector('.para-section .blur-mask')
        let blurValue = blurLimit- ((scrollTop / 650 ) * blurLimit )// current blur value is 20px
        heroBlurMask.style.backdropFilter = `blur(${blurValue}px)`
    }
    if( scrollTop >= bluryImgSectionLimit - bluryImgHeight && scrollTop <= fullSectionHeight && isBlurryActive) {
                    // console.log("Blurry Image touched!")
                    console.log("Scroll Downwards")
                    let bluryImage = document.querySelector('.image-transition .blury-image')
                    // console.log("Client Rect",bluryImage.getBoundingClientRect())
                    let blurValue;
        if (scrollTop <= bluryImgSectionLimit) {
            // ENTERING (scrolling down OR back up into section)
            let dividend = bluryImgSectionLimit - scrollTop;
            let divisor = bluryImgHeight;
            blurValue =blurLimit -((dividend / divisor) * blurLimit);
            // console.log("Entering")
        } else {
            // EXITING (scrolling further down OR back up)
            let dividend = fullSectionHeight - scrollTop;
            let divisor = fullSectionHeight - bluryImgSectionLimit;
            blurValue = ((dividend / divisor) * blurLimit);
            // console.log("Exiting")
        }

        // Clamp between 0 and blurLimit to avoid weird negatives
        blurValue = Math.max(0, Math.min(blurLimit, blurValue));

        bluryImage.style.filter = `blur(${blurValue}px)`;
                }
    else if ( scrollTop<= bluryImgSectionLimit && scrollTop >= bluryImgSectionLimit - (3*bluryImgHeight) && isBlurryActive) {
        console.log("Scroll Upwards")
        let bluryImage = document.querySelector('.image-transition .blury-image')
        fullSectionHeight = bluryImgSectionLimit - (3*bluryImgHeight)
        let blurValue;
        if(scrollTop <= bluryImgSectionLimit && scrollTop > (bluryImgSectionLimit - bluryImgHeight)){
            let dividend = bluryImgSectionLimit - scrollTop 
            let divisor = bluryImgHeight 

            blurValue =blurLimit -((dividend / divisor ) * blurLimit ) 
        }
        else{ 
            console.log("here")
            dividend =  scrollTop - fullSectionHeight 
            divisor = bluryImgSectionLimit - bluryImgHeight
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