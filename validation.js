let validated = true;

function validateForm() {
  validated = true;
  const form = document.getElementById("form");
  const labels = form.querySelectorAll("label");

  // Reset all error messages
  resetAllErrors(labels);

  validateName(labels[0]);
  validateName(labels[1]);
  validateEmail(labels[2]);
  validatePhone(labels[3]);
  validatePassword(labels[4], labels[5]);
  return validated;
}

// Basic validation checking if the name field is empty
function validateName(label) {
  const error = label.querySelector("div");
  const input = label.querySelector("input");

  //TODO: smarter way of checking for special characters
  const specialChars = /[?#*!"§$%&/()=,:;_-][1-9]/

  const isValid = input.value.length > 0;
  const hasSpecialChars = !(specialChars.test(input.value));
  if (!isValid) {
    showError(error, input, "Please enter a name");
  } else if (hasSpecialChars) {
    showError(error, input, "Name cannot contain special characters or numbers");
  }
  
}

function validateEmail(label) {
  const error = label.querySelector("div");
  const input = label.querySelector("input");


  //convert the input into all lowercase
  input.value = input.value.toLowerCase();

  //as per the HTML definition
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const isValid = emailRegExp.test(input.value);

  if (!isValid) {
    showError(error, input, "Please enter a valid email");
  }
}

function validatePhone(label) {
  const error = label.querySelector("div");
  const input = label.querySelector("input");

  const isValid = /^\d+$/.test(input.value);

  if (!isValid) {
    showError(error, input, "Please only use digits for your phone number");
  }
}
//This isnt pretty and doesnt need to be in one function
function validatePassword(label1, label2) {
  const error1 = label1.querySelector("div");
  const input1 = label1.querySelector("input");

  const error2 = label2.querySelector("div");
  const input2 = label2.querySelector("input");

  if (input1.value.length < 6) {
    showError(
      error1,
      input1,
      "The password must be at least 6 characters long"
    );
  } else if (!/\d/.test(input1.value)) {
    showError(error1, input1, "The password must contain at least one digit");
  }

  if (input1.value != input2.value) {
    showError(error2, input2, "The passwords don't match");
  }
}

// Shows error message and marks error
function showError(error, input, message) {
  if (error.textContent != "") {
    error.textContent += "\n";
  }
  error.textContent += message;
  error.className = "error-message active";
  input.className = "invalid";
  validated = false;
}

// Resets error elements to default
function resetError(error, input) {
  error.textContent = "";
  error.className = "error-message inactive";
  input.className = "";
}

function resetAllErrors(labels) {
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    const error = label.querySelector("div");
    const input = label.querySelector("input");
    resetError(error, input);
  }
}
