// # this script is for the whole website

// line [5 - 79] is for the navbar and is from: https://codepen.io/ettrics/pen/WRbGRN

class StickyNavigation {
	
	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		let self = this;
		$('.et-hero-tab').click(function() { 
			self.onTabClick(event, $(this)); 
		});
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}
	
	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	onScroll() {
		this.checkTabContainerPosition();
    this.findCurrentTabSelector();
	}
	
	onResize() {
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	checkTabContainerPosition() {
		let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
		if($(window).scrollTop() > offset) {
			$('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
		} 
		else {
			$('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
		}
	}
	
	findCurrentTabSelector(element) {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.et-hero-tab').each(function() {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
			if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
		if(this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}
	
	setSliderCss() {
		let width = 0;
		let left = 0;
		if(this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.et-hero-tab-slider').css('width', width);
		$('.et-hero-tab-slider').css('left', left);
	}
	
}

new StickyNavigation();






////////////////////////////////////////////////////////////////////////////////////////////////////

// the following code is for the "hello world" greetings 

// getting the list of greetings
let slideshow = document.querySelector('#slideshow');

// converting the children of the slideshow element into an array
let slides = Array.from(slideshow.children);

// initializing a variable to keep track of the current slide
let currentSlide = 0;

// function to type out the text in the current slide with a given type speed
let typeOutText = (text, typeSpeed = 90) => {
  return new Promise((resolve, reject) => {
    // initializing a variable to keep track of the current character
    let i = 0;

    // function to type out each character in the text
    let type = () => {
      if (i < text.length) {
        // adding the next character to the text content of the slideshow element
        slideshow.textContent += text.charAt(i);
        i++;
        // setting a timeout to type the next character after the given type speed
        setTimeout(type, typeSpeed);
      } else {
        // resolving the promise when all characters have been typed
        resolve();
      }
    };
    
    // typing the text
    type();
  });
};

// function to delete the text in the current slide with a given delete speed
let deleteText = (deleteSpeed = 50) => {
  return new Promise((resolve, reject) => {
    // getting the text content of the current slide
    let text = slides[currentSlide].textContent;
    // initializing a variable to keep track of the number of characters remaining
    let i = text.length;
    // function to delete each character in the text
    let deleteChar = () => {
      if (i > 0) {
        // removing the last character from the text content of the slideshow element
        slideshow.textContent = text.substring(0, i - 1);
        i--;
        // setting a timeout to delete the next character after the given delete speed
        setTimeout(deleteChar, deleteSpeed);
      } else {
        // resolving the promise when all characters have been deleted
        resolve();
      }
    };
    // deleting the text
    deleteChar();
  });
};

// Function to change to the next slide
let changeSlides = () => {
  return new Promise((resolve, reject) => {
    // Set the current slide to the next slide, or back to the first slide if on the last slide
    currentSlide =
      currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    // Resolve the promise after changing the slide
    resolve();
  });
};

// Function to run the slideshow
let runSlides = async () => {
  // Run the slideshow indefinitely
  while (true) {
    // Type out the text in the current slide
    await typeOutText(slides[currentSlide].textContent);
    // Delete the text in the current slide
    await deleteText();
    // Change to the next slide
    await changeSlides();
  }
};

// Start running the slideshow
runSlides();







/////////////////////////////////////////////////////////////////////////////////////////////

// the code below is for the rotation of the logo and is from: https://codepen.io/borntofrappe/pen/LwPKEj
let article = document.querySelector('#logo');

// to compute the center of the image retrieve its coordinates and dimensions
let {
  x, y, width, height,
} = article.getBoundingClientRect();
let cx = x + width / 2;
let cy = y + height / 2;

// following the mousemove event compute the distance betwen the cursor and the center of the image
function handleMove(e) {
  let { pageX, pageY } = e;

  // ! consider the relative distance in the [-1, 1] range
  let dx = (cx - pageX) / (width / 2);
  let dy = (cy - pageY) / (height / 2);

  // rotate the image around the x axis, according to the vertical distance, and around the y acis, according to the horizontal gap 
  this.style.transform = `rotateX(${180 * dy * -1}deg) rotateY(${20 * dx}deg)`;
}

// following the mouseout event reset the transform property
function handleOut() {
  this.style.transform = 'initial';
}

article.addEventListener('mousemove', handleMove);
article.addEventListener('mouseout', handleOut);
