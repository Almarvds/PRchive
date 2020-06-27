console.log('client.js called')

const form = document.querySelector('form');

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
})
