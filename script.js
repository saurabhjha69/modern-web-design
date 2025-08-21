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
