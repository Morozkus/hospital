const form = document.querySelector('#login__form')
const btn = document.querySelector('#submit')
const username = document.querySelector('#username')
const password = document.querySelector('#password')


btn.addEventListener('click', async (e) => {
    e.preventDefault()
    const obj = {
        username: username.value,
        password: password.value
    }

    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(obj)
    })
    const result = await response.json()
    
    location.href = '../cabinet'
})