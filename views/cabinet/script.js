import routerAdmin from "./scripts/Router.js";
import popap from "./scripts/Popap.js";

const workSpace = document.querySelector('#work-space')


workSpace.addEventListener('click', async (e) => {

    if (e.target.closest('.pacient-link')) {

        e.preventDefault();
        let res = await fetch(e.target.closest('.pacient-link').getAttribute('href'))
        let result = await res.json()
        result = result[0]

        popap.getHtmlElement().style.setProperty('--top-position', window.pageYOffset + 'px')
        popap.addView(result.id, result.fio, result.phone)
    }
})