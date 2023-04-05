//메인페이지 상단 슬라이드
let mainslideOption = {
    slide: 'div',
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
    arrows: true,
    dots: true,
    prevArrow: `<button class="white prev"></button>`,
    nextArrow: `<button class="white next"></button>`,
    dotsClass: 'slick-dots white',
    responsive: [
        {
            breakpoint: 1180,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 880,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
            }
        }
    ],
}

$('.slider-tab-con.on .slide').slick(mainslideOption)

//메인페이지 탭
let btnArr = document.querySelectorAll('.slider .slider-tab-btn button')

function mainTab(target, indexNum) {
    let btnLiArr = document.querySelectorAll('.slider-tab-btn li')
    let tabCon = document.querySelectorAll('.slider-tab-con')

    for(let i = 0; i < btnLiArr.length; i++) {
        btnLiArr[i].classList.remove('on')
        tabCon[i].classList.remove('on')
    }

    target.parentElement.classList.add('on')
    tabCon[indexNum].classList.add('on')

    let newSlick = tabCon[indexNum].querySelector('.slide')
    
    $(newSlick).not('.slick-initialized').slick(mainslideOption)
}

for(let i = 0; i < btnArr.length; i++) {
    btnArr[i].addEventListener('click', event => mainTab(btnArr[i], i))
}

// 팀 랭킹 탭
let lankingBtnArr = document.querySelectorAll('.lanking-tab button')

function lankingTab(target, indexNum) {
    let btnLiArr = document.querySelectorAll('.lanking-tab li')
    let tabCon = document.querySelectorAll('.lanking-tabcon')

    for(let i = 0; i < btnLiArr.length; i++) {
        btnLiArr[i].classList.remove('on')
        tabCon[i].classList.remove('on')
    }

    target.parentElement.classList.add('on')
    tabCon[indexNum].classList.add('on')
}

for(let i = 0; i < lankingBtnArr.length; i++) {
    lankingBtnArr[i].addEventListener('click', event => lankingTab(lankingBtnArr[i], i))
}

//사진 및 팀 소개 슬라이드
let slideDiv = document.querySelectorAll('.main-contents')

for(let i = 0; i < slideDiv.length; i++) {
    let slideKind = slideDiv[i].getAttribute('id')
    console.log(slideKind)

    $(slideDiv[i]).slick({
        slide: 'div',
        slidesToShow : slideKind == 'photo' ? 3 : 6,
        slidesToScroll : slideKind == 'photo' ? 3 : 6,
        infinite: false,
        arrows: true,
        dots: true,
        prevArrow: `<button class="prev"></button>`,
        nextArrow: `<button class="next"></button>`,
        dotsClass: 'slick-dots',
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: slideKind == 'photo' ? 2 : 3,
                    slidesToScroll: slideKind == 'photo' ? 2 : 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: slideKind == 'photo' ? 1 : 3,
                    slidesToScroll: slideKind == 'photo' ? 1 : 3,
                    arrows: false,
                }
            }
        ]
    })
}

//스케줄 js

//월 선택 (중복 O)
let scheduleBtn = document.querySelectorAll('.schedule .slider-tab-btn button')
let scheduleItem = document.querySelectorAll('.schedule-item')
let scheduleBottomBtn = document.querySelectorAll('.schedule-btn')
console.log(scheduleBtn[0])

function scheduleButton(target) {
    if(target.getAttribute('class') != 'all') {
        target.parentElement.classList.toggle('on')
        scheduleBtn[0].parentElement.classList.remove('on')
    } else {
        scheduleBtn[0].parentElement.classList.toggle('on')
        for(let i = 1; i < scheduleBtn.length; i++) {
            scheduleBtn[i].parentElement.classList.remove('on')
        }
    }

    scheduleOpen()
}

function scheduleOpen() {
    if(scheduleBtn[0].parentElement.getAttribute('class') == 'on') {
        for(let i = 0; i < scheduleItem.length; i++) {
            scheduleItem[i].classList.add('on')
        }
        return
    } else {
        for(let i = 0; i < scheduleItem.length; i++) {
            scheduleItem[i].classList.remove('on')
        }

        let openMonth = document.querySelectorAll('.schedule .slider-tab-btn .on button')
        
        for(let i = 0; i < openMonth.length; i++) {
            let month = openMonth[i].innerText
            
            for(let j = 0; j < scheduleItem.length; j++) {
                let item = scheduleItem[j].querySelector('h2').innerText
                if(month == item) {
                    scheduleItem[j].classList.add('on')
                }
            }
        }
    }
}

function scheduleItemBtn(target) {
    let item = target.closest('.schedule-item')
    item.classList.toggle('on')
    let month = item.querySelector('h2').innerText

    if(item.classList.contains('on')) {
        for(let i = 1; i < scheduleBtn.length; i++) {
            let btn = scheduleBtn[i].innerText

            if(month == btn) {
                scheduleBtn[i].parentElement.classList.add('on')
            }
        }
    } else {
        for(let i = 1; i < scheduleBtn.length; i++) {
            let btn = scheduleBtn[i].innerText

            if(month == btn) {
                scheduleBtn[i].parentElement.classList.remove('on')
            }
        }
    }

    let close = false;
    for(let i = 0; i < scheduleBtn.length; i++) {
        if(!scheduleBtn[i].parentElement.classList.contains('on')) {
            close = true
        }
    }
    
    if(close) {
        scheduleBtn[0].parentElement.classList.remove('on')
        console.log('hi')

        for(let i = 0; i < scheduleItem.length; i++) {
            if(scheduleItem[i].classList.contains('on')) {
                let index = i+1
                scheduleBtn[index].parentElement.classList.add('on')
            }
        }
    }
}

for(let i = 0; i < scheduleBtn.length; i++) {
    scheduleBtn[i].addEventListener('click', event => scheduleButton(scheduleBtn[i]))
}
for(let i = 0; i < scheduleBottomBtn.length; i++) {
    scheduleBottomBtn[i].addEventListener('click', event => scheduleItemBtn(scheduleBottomBtn[i]))
}
scheduleBtn[0].parentElement.classList.add('on')
for(let i = 0; i < scheduleItem.length; i++) {
    scheduleItem[i].classList.add('on')
}