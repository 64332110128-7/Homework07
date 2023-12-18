const loginForm = document.querySelector(".login-form");

const users = [
    { username: 'andy', password: 'andy1234'},
    { username: 'bobby', password: 'bobby2345'},
    { username: 'candy', password: 'candy3456'}
]

const login = (inputObj) => {
    let round = 0
    let inp1 = inputObj.username.trim()
    let inp2 = inputObj.password.trim()
    let access = false
    for (let i = 0; i < users.length; i++) {  
		if (inp1 == users[i].username && inp2 == users[i].password) {
			access = true
        }
    }
    if(access === true){
        alert('login successful')
        window.location.assign('https://www.example.com')
    } else {
        alert('Username or Password are incorrect.')
        round += 1
    }
}

const valueError = (el, error) => {
    if (error) {
        el.style.borderColor = 'red'
    } else {
        el.style.borderColor = ''
    }
}

const validateInput = (inputObj) => {
    const usernameInput = document.querySelector('#username')
    const passwordInput = document.querySelector('#password')
    const roleInput = document.querySelector('#role')

    const usernameValue = inputObj.username.trim()
    const passwordValue = inputObj.password.trim()
    const roleValue = role.value.trim()

    const validPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/.test(passwordValue)
    
    const checkUsername = (usernameValue) => {
        if(usernameValue === ''){
            alert('Plese enter Username')
            valueError(usernameInput, true)
        } else if (usernameValue.includes(' ')){
            alert('contain empty spaces')
            valueError(usernameInput, true)
        } else if (usernameValue.length < 4 ){
            alert('Username must be more than 3 characters')
            valueError(usernameInput, true)
        } else if (!isNaN(parseInt(usernameValue.charAt(0)))) {
            alert('Username cant start with a number')
            valueError(usernameInput, true)
        } else {
            valueError(usernameInput, false);
            return true;
        }
    }

    const checkPassword = (passwordValue) => {
        if(passwordValue === ''){
            alert('Plese enter Password')
            valueError(passwordInput, true);
        } else if (passwordValue.length < 5){
            alert('Password must be more than 4 characters')
            valueError(passwordInput, true);
        } else if(!validPass){
            alert('Password must have letters and numbers')
            valueError(passwordInput, true);
        } else {
            valueError(passwordInput, false);
            return true;
        }
    }

    const checkRole = (roleValue) => {
        if(roleValue === ''){
            alert('Plese select role')
            valueError(roleInput, true);
        } else {
            valueError(roleInput, false);
            return true;
        }
    }

    const user = checkUsername(usernameValue)
    const pass = checkPassword(passwordValue)
    const rl = checkRole(roleValue)

    if(user === true && pass === true && rl === true){
        login(inputObj)
    }
};

const hdlLogin = (e) => {
  e.preventDefault();
  console.log(loginForm.elements);
  let allInput = loginForm.elements;
  let inputObj = {};
  for (let el of loginForm.elements) {
    inputObj[el.id] = el.value;
  }
  validateInput(inputObj)
};

loginForm.addEventListener("submit", hdlLogin);

// โจทย์ : ให้สร้างฟังก์ชั่นเพื่อ validate(ตรวจสอบ) ค่าที่ submit จาก form
// 1. ทุก input ต้องไม่เป็นค่าว่างหรือ ใส่ space มาล้วนๆ
// 2. username ความยาวต้องมากกว่า 3 ตัวอักษร
//      - ตัด space หน้า-หลัง
//      (option) - และไม่มี space คั่นกลาง
//      - ห้ามนำหน้าด้วยตัวเลข
// 3. password ความยาวต้องมากกว่า 4 ตัวอักษร
//      (option) - ต้องมีทั้งตัวเลขและตัวอักษร
// ถ้า validate ไม่ผ่านให้เปลี่ยน input เป็นสีแดง
// ถ้า validate ผ่านให้ไปที่ https://www.example.com
// หรือ
// ถ้า validate ผ่านให้ไปทำการ login โดยตรวจสอบ username, password
// กับ array แบบที่เคยทำตอนโจทย์ javascript แล้วแจ้ง login successful