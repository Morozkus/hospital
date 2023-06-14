'use strict'
import fetching from './fetching.js'

const TPList = await fetching.getDoctor('therapist', '../doctors/doctors_img/therapist')
const SGList = await fetching.getDoctor('surgeon', '../doctors/doctors_img/surgeon')
const OPList = await fetching.getDoctor('orthopedist', '../doctors/doctors_img/orthopedist')

const doctorsImg = {
    'therapist': TPList,
    'surgeon': SGList,
    'orthopedist': OPList
}

const popap = document.querySelector('#popap')
const title = document.querySelector('#popap__title')
const diploma = document.querySelector('#diploma')

const therapist = document.querySelector('#therapist')
const surgeon = document.querySelector('#surgeon')
const orthopedist = document.querySelector('#orthopedist')

function clearPopap() {
    title.innerHTML = ''
    diploma.innerHTML = ''
}

function fillPopap(e) {
    let str = ''
    const name = e.target.closest('.list__info').querySelector('.list__name').textContent
    const arr = doctorsImg[e.target.getAttribute('id')]
    for(let i = 0; i < arr.length; i++) {
        str += `<li class="popap__item"><img class="popap_img" src="${arr[i]}"></li>\n`
    }
    title.textContent = name
    return diploma.innerHTML = str
}

function openPopap() {
    popap.style.setProperty('--top-position', window.pageYOffset + 'px')
    popap.classList.add('popap_active')
}

function closePopap(e) {
    if (!e.target.closest('.popap__container')) {
        popap.classList.remove('popap_active')
    }

    document.body.removeEventListener('click', closeBtn)
}

function clickBtn(e) {
    clearPopap()
    fillPopap(e)
    openPopap()

    therapist.removeEventListener('click', clickBtn)
    surgeon.removeEventListener('click', clickBtn)
    orthopedist.removeEventListener('click', clickBtn)
    setTimeout(() => {
        document.body.addEventListener('click', closeBtn)
    }, 100)

}

function closeBtn(e) {
    if (e.target.closest('.popap__container')) return
    closePopap(e)
    clearPopap()

    therapist.addEventListener('click', clickBtn)
    surgeon.addEventListener('click', clickBtn)
    orthopedist.addEventListener('click', clickBtn)
}

therapist.addEventListener('click', clickBtn)
surgeon.addEventListener('click', clickBtn)
orthopedist.addEventListener('click', clickBtn)