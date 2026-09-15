const featureSection = document.querySelector('.features-container')
const operationSecton = document.querySelector('.operation-container')
const testimonialsSection = document.querySelector('.testimonial-container')
const header = document.querySelector('.nav-section')
const home = document.querySelector('.home')
const section = document.querySelectorAll('.reveal')
const operationBtns = document.querySelector('.btn-area')
const operationCard = document.querySelectorAll('.operation-card')
const blurImage = document.querySelectorAll('.img')
const testimonial = document.querySelectorAll('.testimonials-body')
const arrowRight = document.querySelector('.arrow-right')
const arrowLeft = document.querySelector('.arrow-left')
const dots = document.querySelector('.dots')
const sideBarButton = document.querySelector('.lines')
const sideBar = document.querySelector('.side-bar')
const theContainer = document.querySelector('.container')
const modal = document.querySelector('.open-account-card')
const closeModal = document.querySelector('.close-modal')
const openAccount = document.querySelectorAll('.open-account')




// Smooth scrolling 

const navHandling = function(e){
e.preventDefault()

const targetLink = e.target;
if(targetLink.classList.contains('open-account'))return
if(!targetLink.classList.contains('link'))return
else {
   const theScreen = document.querySelector(e.target.getAttribute('href'));
   theScreen.scrollIntoView({behavior : 'smooth'})
   
}
}


header.addEventListener('click', navHandling)

// modal

openAccount.forEach(button =>{
  button.addEventListener('click', function(){
    modal.classList.add('open-modal')
  theContainer.style.filter = `blur(${10}px)`
})
})

closeModal.addEventListener('click', function(){
   modal.classList.remove('open-modal')
  theContainer.style.filter = ``
})

const contolSideBar = function(){
 sideBar.classList.toggle('open-side')
  theContainer.classList.toggle('blur-container')
  if(sideBar.classList.contains('open-side')){
    document.body.style.overflow = 'hidden'
  } 
  else{
    document.body.style.overflow = 'auto'
  }

}

sideBar.addEventListener('click', function(e){
 
  if(e.target.classList.contains('nav-link')) {
    navHandling(e)
    sideBar.classList.remove('open-side')
    document.body.style.overflow = 'auto'
    theContainer.classList.toggle('blur-container')
  }
})

sideBarButton.addEventListener('click', contolSideBar)



// Sticky header
const navHeight = header.getBoundingClientRect().height

const stickyCallBack = function(e){
  const entry = e[0]
  if(!entry.isIntersecting){
    header.classList.add('sticky')
    sideBarButton.classList.add('sticky')
  }
  else {
    header.classList.remove('sticky') 
    sideBarButton.classList.remove('sticky') 
  }
}

const options = {
    root : null,
    threshold : 0,
    rootMargin : `-${navHeight}px`

}
const observer = new IntersectionObserver(stickyCallBack, options)

observer.observe(home)



// nav-active

header.addEventListener('mouseover', function(e){
e.preventDefault()
  if(e.target.classList.contains('nav-link') || e.target.classList.contains('nav-logo') ){
  const lists = [...e.target.closest('.nav-section').children];
  lists.forEach(target => target.classList.add('nav-active'))
  e.target.classList.remove('nav-active')
  }
})

header.addEventListener('mouseout', function(e){
   const lists = [...e.target.closest('.nav-section').children];
  lists.forEach(target => target.classList.remove('nav-active'))
})



// revealing elements

const intor = function(e){
  e.forEach(eve =>{
    if(eve.isIntersecting){
      eve.target.classList.remove('reveal')
      revealing.unobserve(eve.target)
    }

  })


}

const revealer = {
  root : null,
  threshold : 0.15
}

const revealing = new IntersectionObserver(intor, revealer)
const sections = [...section]
sections.forEach(sec=> {
  revealing.observe(sec)
})


// blur image loading
const loadImage = function(){

  const theObserver = function(e){

  
      e.forEach(eve => {
        if(eve.isIntersecting)  eve.target.classList.remove('blur')
      })  
  
    
  
  }

  const theOptions ={
    root: null,
    threshold : 0.5
  }

  const observeImg = new IntersectionObserver(theObserver, theOptions)

  blurImage.forEach(img=> observeImg.observe(img))
}

loadImage()


// operation cards

operationBtns.addEventListener('click', function(e){
  const eachOperation = [...operationBtns.children]
eachOperation.forEach(opr=>{
  opr.classList.remove('operation-active')
  e.target.classList.add('operation-active')
})

operationCard.forEach(opCad => {
 opCad.classList.remove('show-option')
})
operationCard[e.target.dataset.number].classList.add('show-option')
;

})


// testimonials slide
const theDot = [...dots.children]
let count = 0;

const moveTo = function(slide){
   testimonial.forEach((test, i) =>{
    test.style.transform = `translateX(${(i - slide) * 100}%)`

    if(i-slide === 0){
         theDot.forEach( dot => {
      dot.classList.remove('dot-active')
    });
     theDot[i].classList.add('dot-active')
    }
    
  } )
}

moveTo(0)

const movingRight = function(){
  if(count === testimonial.length -1 ) count = 0;
  else  count++
  moveTo(count)

}

const movingLeft = function(){
  if(count === 0) count = testimonial.length -1;
  else count--
  moveTo(count)
  
}
dots.addEventListener('click', function(e){
  count = e.target.dataset.dot
  moveTo(count)
})

arrowRight.addEventListener('click', movingRight)

window.addEventListener('keydown',function(e){
 if(e.key === 'ArrowRight') movingRight()
})

window.addEventListener('keydown',function(e){
 if(e.key === 'ArrowLeft') movingLeft()
})

arrowLeft.addEventListener('click', movingLeft)


