console.log('client.js called')

var form = document.querySelector('form');
var homeScreen = document.querySelector('div.homeScreen')
homeScreen.style.display='none';


function loggedIn(user){
  console.log('logged in')
  form.style.display = 'none';
  homeScreen.style.display='';
  drawProfile(user)
}

function drawProfile(userName){
  var userProfile = document.querySelector('.profile')
}

form.onsubmit = async function() {
  event.preventDefault()
  const backend_URL = 'http://localhost:5000/login'
  const formData = new FormData(form)
  const username = formData.get('username')
  const password = formData.get('password')

  const loginData = {
    username,
    password
  }
  console.log('login called')
  console.log(loginData)
  fetch(backend_URL, {
    method:'POST',
    body: JSON.stringify(loginData),
    headers: {
      'content-type':'application/json'
    }
  }).then((res) => res.text())
  .then((text) => {
      console.log(text)
      var emailNew = JSON.parse(text)
      var legit = emailNew.legit
      console.log(legit)
      if(legit){
        loggedIn(username)
      }
  })
};

document.getElementById('btn2').onclick = function() {
    event.preventDefault()
    const backend_URL = 'http://localhost:5000/signup'
    const formData = new FormData(form)
    const username = formData.get('username')
    const password = formData.get('password')

    const signupData = {
      username,
      password
    }
    console.log('signup called')
    console.log(signupData)
    fetch(backend_URL, {
      method:'POST',
      body: JSON.stringify(signupData),
      headers: {
        'content-type':'application/json'
      }
    }).then((res) => res.text())
    .then((text) => {
        console.log(text)
        var emailNew = JSON.parse(text)
        var legit = emailNew.legit
        if(legit){
          loggedIn(userName)
        }
    })
    console.log('done')
};
