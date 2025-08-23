let underLayingImage = document.querySelector('.blury-image')

let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            console.log("Enteracted")
            underLayingImage.style.position = "sticky"
            underLayingImage.style.top = "0"
            underLayingImage.style.zIndex = "-1"

        }
    })
},{threshold: 0,rootMargin: "0px 0px -100% 0px"})
observer.observe(underLayingImage)

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