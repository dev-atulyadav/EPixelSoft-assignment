// We have stored the validation  rules in the object. Now we need to validate the input data with these rules.
const VALIDATION_RULES = {
  NAME_PATTERN: /^[a-zA-Z]+$/,
  EMAIL_PATTERN: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_PATTERN: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
  PASSWORD_MIN_LENGTH: 8,
};
// Get the from  element from DOM
const form = document.forms[0];
// Get the error messages  element from DOM
const errorMessages = document.querySelectorAll(".err");

// Here's the inital  state of the form
let userData = {
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  password: "",
};
// Function to validate the form data and  display error messages on UI
const showError = (errElementId, message) => {
  errorMessages.forEach((err) => {
    if (err.getAttribute("id") === errElementId) {
      err.style.visibility = "visible";
      err.textContent = message;
    }
  });
};
// Function to hide or clear the error messages from the UI
const clearError = (fieldId) => {
  errorMessages.forEach((err) => {
    if (err.getAttribute("id") === fieldId) {
      err.style.visibility = "hidden";
      err.textContent = "";
    }
  });
};

// Functions to validate the form data
const validators = {
  validateFirstName: () => {
    const { first_name } = userData;
    //if  the first name is empty, this will show error
    if (!first_name) {
      showError("firstNameErr", "Required field*");
      return false;
    }
    //if  the first name does not match the pattern, this will show errorF
    if (!VALIDATION_RULES.NAME_PATTERN.test(first_name)) {
      showError("firstNameErr", "First name should only contain letters");
      return false;
    }
    //if  the first name is valid, this will clear the error
    clearError("firstNameErr");
    return true;
  },

  validateLastName: () => {
    const { last_name } = userData;
    //if  the last name is empty, this will show error
    if (!last_name) {
      showError("lastNameErr", "Required field*");
      return false;
    }
    //if  the last name does not match the pattern, this will show error
    if (!VALIDATION_RULES.NAME_PATTERN.test(last_name)) {
      showError("lastNameErr", "Last name should only contain letters");
      return false;
    }
    //if  the last name is valid, this will clear the error
    clearError("lastNameErr");
    return true;
  },

  validateEmail: () => {
    const { email } = userData;
    //if  the email is empty, this will show error
    if (!email) {
      showError("emailErr", "Required field*");
      return false;
    }
    // if  the email does not match the pattern, this will show error
    if (!VALIDATION_RULES.EMAIL_PATTERN.test(email)) {
      showError("emailErr", "Must be a valid email format.");
      return false;
    }
    //if  the email is valid, this will clear the error
    clearError("emailErr");
    return true;
  },

  validatePassword: () => {
    const { password } = userData;
    //if  the password is empty, this will show error
    if (!password) {
      showError("passErr", "Required field*");
      return false;
    }
    //if  the password does not match the pattern, this will show error
    if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
      showError("passErr", "Minimum 8 characters");
      return false;
    }
    //if  the password is valid, this will clear the error
    clearError("passErr");
    return true;
  },

  validatePhone: () => {
    const { phone_number } = userData;
    //if  the phone number is empty, this will show error
    if (!phone_number) {
      showError("phErr", "Required field*");
      return false;
    }
    //if  the phone number does not match the pattern, this will show error
    if (
      !VALIDATION_RULES.PHONE_PATTERN.test(phone_number)
    ) {
      showError("phErr", "Must be a valid phone number format");
      return false;
    }
    //if  the phone number is valid, this will clear the error
    clearError("phErr");
    return true;
  },
};
//  This  function will be called when the form is submitted
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const {
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePassword,
    validatePhone,
  } = validators;
  userData = {
    first_name: form.elements["firstName"].value.trim(),
    last_name: form.elements["lastName"].value.trim(),
    phone_number: form.elements["phone"].value.trim().replaceAll(" ", ""),
    email: form.elements["email"].value.trim(),
    password: form.elements["password"].value,
  };
  //   Validating all fields on  form submission
  for (const key in userData) {
    if (key) {
      validateFirstName();
      validateLastName();
      validateEmail();
      validatePassword();
      validatePhone();
    }
  }
  if (isValid()) {
    //  If all fields are valid, this will submit the form
    // form.submit();
    console.log(userData);

    console.log("Form submitted successfully");
  }
});

//   This  function will be called when the user clicks on the submit button
function isValid() {
  const {
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePassword,
    validatePhone,
  } = validators;
  return (
    validateFirstName() &&
    validateLastName() &&
    validateEmail() &&
    validatePassword() &&
    validatePhone()
  );
}
