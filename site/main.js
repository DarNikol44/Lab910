let form = document.querySelector('#form')
let log = document.querySelector('#username')
let phone = document.querySelector('#phone')
let email = document.querySelector('#email')
let site = document.querySelector('#site')

form.addEventListener('submit', function (event) {
  event.preventDefault()
  let inputs = document.querySelectorAll('input');
  let valid = true;
  removeValidation()

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() === '') {
      valid = false;
      inputs[i].parentNode.appendChild(ErrorMsg());
    }
  }

  if (validateEmail() === false) {
    valid = false
  }

  if (validatePhone() === false) {
    valid = false
  }

  if (valid) {
    let req = {
      username: log.value,
      phone: phone.value,
      email: email.value,
      website: site.value
    }
    fetch("/server", { 
      method: "POST", 
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(req)
    })
    .finally(() => alert("Данные успешно отправлены"))
    .then(response => response.text())
    .then(obj => console.log(obj))
  }
})

function ErrorMsg(){
  let errorMessage = document.createElement('p');
  errorMessage.className = 'error'
  errorMessage.textContent = 'Заполните поле';
  errorMessage.style.margin = 0;
  errorMessage.style.color = 'red';
  return errorMessage
}
  
function removeValidation() {
  let errors = form.querySelectorAll('.error')

  for (var i = 0; i < errors.length; i++) {
    errors[i].remove()
  }
}
function validateEmail() {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let address = email.value;
  if(reg.test(address) == false) {
     alert('Ваш email не проходит валидацию, проверьте правильность ввода');
     return false;
  }
}

function validatePhone() {
    let reg = /^(\+7)+([0-9]){10}$/;
    let number = phone.value;
    if(reg.test(number) == false) {
       alert('Ваш номер телефона не проходит валидацию, проверьте правильность ввода');
       return false;
    }
  }