console.log('client.js called')

const form = document.querySelector('form');
const backend_URL = 'http://localhost:5000/login'

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form)
  const username = formData.get('username')
  const password = formData.get('password')

  const loginData = {
    username,
    password
  }
  form.style.display = 'none';
  console.log(loginData)

  fetch(backend_URL, {
    method:'POST',
    body: JSON.stringify(loginData),
    headers: {
      'content-type':'application/json'
    }
  })
})
