export default function updateActiveIndex(newActiveIndex) {
	const swiper = this;
	const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
	const {
		slidesGrid,
		snapGrid,
		params,
		activeIndex: previousIndex,
		realIndex: previousRealIndex,
		snapIndex: previousSnapIndex
	} = swiper;
	let activeIndex = newActiveIndex;
	let snapIndex;

	if (typeof activeIndex === 'undefined') {
		for (let i = 0; i < slidesGrid.length; i += 1) {
			if (typeof slidesGrid[i + 1] !== 'undefined') {
				if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) /
					2) {
					activeIndex = i;
				} else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
					activeIndex = i + 1;
				}
			} else if (translate >= slidesGrid[i]) {
				activeIndex = i;
			}
		} // Normalize slideIndex


		if (params.normalizeSlideIndex) {
			if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
		}

	}

	if (snapGrid.indexOf(translate) >= 0) {
		snapIndex = snapGrid.indexOf(translate);
	} else {
		const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
		snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
	}

	if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;



	if (swiper.loopedSlides) {
		swiper.slides.filter((item) => item.index >= swiper.loopedSlides && item.index < swiper.slides.length - swiper
			.loopedSlides).forEach((item, index) => {
			item.dataSwiperSlideIndex = item.index - swiper.loopedSlides;
		})
		swiper.slides.filter((item) => item.index < swiper.loopedSlides).forEach((item, index) => {
			if (swiper.slides[swiper.slides.length - swiper.loopedSlides * 3 + index]) {
				item.dataSwiperSlideIndex = swiper.slides[swiper.slides.length - swiper.loopedSlides * 3 +
						index]
					.index;
			}
		})
		swiper.slides.filter((item) => item.index >= swiper.slides.length - swiper
			.loopedSlides).forEach((item, index) => {
			item.dataSwiperSlideIndex = swiper.slides[index].index;
		})
	}


	if (activeIndex === previousIndex) {
		if (snapIndex !== previousSnapIndex) {
			swiper.snapIndex = snapIndex;
			swiper.emit('snapIndexChange');
		}

		return;
	} // Get real index

	let realIndex;
	if (swiper.virtual && params.virtual.enabled) {
		realIndex = activeIndex;
	} else {
		if (swiper.slides[activeIndex].dataSwiperSlideIndex == undefined || swiper.slides[activeIndex]
			.dataSwiperSlideIndex == null) {
			realIndex = activeIndex;
		} else {
			realIndex = swiper.slides[activeIndex].dataSwiperSlideIndex;
		}
	}
	Object.assign(swiper, {
		snapIndex,
		realIndex,
		previousIndex,
		activeIndex
	});
	swiper.emit('activeIndexChange');
	swiper.emit('snapIndexChange');

	if (previousRealIndex !== realIndex) {
		swiper.emit('realIndexChange');
	}

	if (swiper.initialized || swiper.params.runCallbacksOnInit) {
		swiper.emit('slideChange', activeIndex);
	}
}
