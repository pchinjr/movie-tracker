let forms = document.querySelectorAll("form[action='/watched']")

for (let f of forms) {
  f.querySelector('button').style.display = 'none'
  let check = f.querySelector('input[type="checkbox"]')  
  check.addEventListener('change', function (e) {
    f.submit() 
  }, false)
}

