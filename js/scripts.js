// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]
OVERLAY = document.querySelector('.overlay')


document.addEventListener('DOMContentLoaded', function () {
	// Карусель отзывов
	const reviewsSliders = [],
		reviews = document.querySelectorAll('.reviews .swiper')

	reviews.forEach(function (el, i) {
		el.classList.add('reviews_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			breakpoints: {
				0: {
					spaceBetween: 10,
					slidesPerView: 'auto'
				},
				768: {
					spaceBetween: 24,
					slidesPerView: 2
				},
				1024: {
					spaceBetween: 24,
					slidesPerView: 3
				},
				1280: {
					spaceBetween: 30,
					slidesPerView: 3
				}
			},
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.review')),
				resize: swiper => {
					let reviews = swiper.el.querySelectorAll('.review')

					reviews.forEach(el => el.style.height = 'auto')

					setHeight(reviews)
				}
			}
		}

		reviewsSliders.push(new Swiper('.reviews_s' + i, options))
	})


	// First section animation
	$('.first_section .image').addClass('animating')


	// Reasons animation
	currentIndex = 0

	setReasonsAnimate(currentIndex)


	// Плавная прокрутка к якорю
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				$('header .mob_menu_btn').removeClass('active')
				$('body').removeClass('menu_open')
				$('header .menu').removeClass('show')

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'center'
				}, 1000)
			})
		})
	}


	// Моб. меню
	$('header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('menu_open')
		$('header .menu').toggleClass('show')
	})


	// Счётчик лайков
	// const count = new CountUp('likesCount', {
	// 	startVal: 700,
	// 	duration: 2,
	// 	onCompleteCallback: () => count.update(999)
	// })

	// count.update(999)


	// Анимация чисел
	countUpLikes()
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth


		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})



// Reasons animation
function setReasonsAnimate(index) {
	$('.reasons .items .item').removeClass('animating')
	$('.reasons .items .item').eq(index).addClass('animating')

	setTimeout(() => {
		(currentIndex + 1) == $('.reasons .items .item').length
			? currentIndex = 0
			: currentIndex++

		setReasonsAnimate(currentIndex)
	}, 3000)
}



// Анимация чисел
function countUpLikes() {
	var time = 15,
		cc = 1

	$('#likesCount').each(function() {
		let i = 700,
			num = $(this).data('num'),
			step = 1000 * time / num,
			that = $(this),
			int = setInterval(() => {
				if (i <= num) {
					that.html(i)
				} else {
					cc = cc + 2
					clearInterval(int)
					countUpLikes()
				}

			i++
		}, step)
	})
}