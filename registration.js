function validateEmail (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePassword (password) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$/;
    return re.test(password);
}

function registerUser() {

    // (1) Read the values in the input elements
    let textFieldsArray = document.getElementsByClassName('field');
    let firstNameField = textFieldsArray[0];
    let lastNameField = textFieldsArray[1];
    let emailField = textFieldsArray[2];
    let passwordField = textFieldsArray[3];
    let phoneField = textFieldsArray[4];

    let termsAndConditions = document.getElementsByClassName('checkbox')[0];


    let userErrorsDiv = document.getElementsByClassName('user-errors')[0];
    let userSuccessDiv = document.getElementsByClassName('user-success')[0];


    // (2) Validate the value
    const errors = [];

    if( firstNameField.value.length === 0 ) {
        errors.push('Please enter first name');
    }

    if( lastNameField.value.length === 0 ) {
        errors.push('Please enter last name');
    }

    if( !validateEmail(emailField.value) ) {
        errors.push('Please enter valid email');
    }

    if( !validatePassword(passwordField.value) ) {
        errors.push('Please enter a password');
    }

    if( termsAndConditions.checked === false) {
        errors.push('Please accept the terms & conditions');
    }

    // If the required fields are valid
    if( errors.length === 0 ) {
        // Register data
    
        const formData = {
            firstname: firstNameField.value,
            lastname: lastNameField.value,
            email: emailField.value,
            password: passwordField.value,
            phone: phoneField.value
        }

        fetch(
            'http://localhost:3001/users/create',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
        )
        .then(
            function(backendResponse) {
                return backendResponse.json();
            }
        )
        .then(
            function(jsonResponse) {
                console.log(jsonResponse);
                userSuccessDiv.style.display = "block";
                userErrorsDiv.style.display = "none";
            }
        )
        .catch(
            function(backendError) {
                console.log(backendError);
                userErrorsDiv.innerHTML = "An error occured. Please try again.";
                userErrorsDiv.style.display = "block";
            }
        )

    } 
    // If the required fields are NOT valid
    else {
        // Indicate the error
        
        // Turn the errors into a string        
        // Put the errors inside the alert box
        userErrorsDiv.innerHTML = errors.join("<br/>");

        // Reveal the alert box
        userErrorsDiv.style.display = "block";
    }

}