// get all the DOM elements

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// input error message
function showError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

// input success 
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}

// check if email is valid 

function isValidEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'e-Mail not valid');
    }
}

// check required fields 

function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if (input.value.trim() == '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// get field name, to capitalize the first letter of the field
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.toLowerCase().slice(1);
}

// check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be atleast ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// check passwords match
function checkPasswordMatch(input1, input2) {
    if (input1.value != input2.value) {
        showError(input2, `Passwords did not match`);
    }
}
// adding a event listener to the submit button.

form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 30);
    isValidEmail(email);
    checkPasswordMatch(password, password2);


})