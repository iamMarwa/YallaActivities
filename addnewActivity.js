
function AddnewActivity() {

    // (1) Read the values in the input elements
    let textFieldsArray = document.getElementsByClassName('field');
    let nameField = textFieldsArray[0];
    let locationField = textFieldsArray[1];
    let dateField = textFieldsArray[2];
    let categoryField = textFieldsArray[3];
    let priceField = textFieldsArray[4];
    let descriptionField = textFieldsArray[5];
    let imageUrlField = textFieldsArray[6];


    let actErrorsDiv = document.getElementsByClassName('act-errors')[0];
    let actSuccessDiv = document.getElementsByClassName('act-success')[0];


    // (2) Validate the value
    const errors = [];

    if( nameField.value.length === 0 ) {
        errors.push('Please enter the activity title');
    }

    if( locationField.value.length === 0 ) {
        errors.push('Please enter location');
    }

    if( dateField.value.length === 0 ) {
        errors.push('Please enter the date');
    }

    if( categoryField.value.length === 0) {
        errors.push('Please specfiy which category');
    }
    if( priceField.value.length === 0) {
        errors.push('Please enter the price');
    }
    if( descriptionField.value.length === 0) {
        errors.push('Please enter the description');
    }
    if( imageUrlField.value.length === 0) {
        errors.push('Please enter an image');
    }



    // If the required fields are valid
    if( errors.length === 0 ) {
        // Register data
    
        const formData = {
            name: nameField.value,
            location: locationField.value,
            date: dateField.value,
            category: categoryField.value,
            price: priceField.value,
            description: descriptionField.value,
            imageUrl: imageUrlField.value
        }

        fetch(
            'http://localhost:3001/activities/add_activity',
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
                actSuccessDiv.style.display = "block";
                actErrorsDiv.style.display = "none";
            }
        )
        .catch(
            function(backendError) {
                console.log(backendError);
                actErrorsDiv.innerHTML = "An error occured. Please try again.";
                actErrorsDiv.style.display = "block";
            }
        )

    } 
    // If the required fields are NOT valid
    else {
        // Indicate the error
        
        // Turn the errors into a string        
        // Put the errors inside the alert box
        actErrorsDiv.innerHTML = errors.join("<br/>");

        // Reveal the alert box
        actErrorsDiv.style.display = "block";
    }

}