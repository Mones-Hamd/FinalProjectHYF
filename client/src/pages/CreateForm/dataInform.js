Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const handleDatePicker = (day) => {
  return new Date().addDays(day).toISOString().slice(0, 16);
};

export const textInputsAttributes = [
  {
    id: 1,
    name: "eventTitle",
    type: "text",
    placeholder: "What is your wedding's title?",
    errorMessage: "Wedding title should be between 5 and 50 characters long.",
    label: "Wedding Title",
    pattern: "^.{5,50}$",
    required: true,
    className: "form-input",
  },
  {
    id: 2,
    name: "brideName",
    type: "text",
    placeholder: "What is bride's name?",
    errorMessage: "Bride's name should be between 1 and 30 characters long.",
    label: "Bride's Name",
    pattern: "^.{1,30}$",
    required: true,
    className: "form-input",
  },
  {
    id: 3,
    name: "groomName",
    type: "text",
    placeholder: "What is groom's name?",
    errorMessage: "Groom's name should be between 1 and 30 characters long.",
    label: "Groom's name",
    pattern: "^.{1,30}$",
    required: true,
    className: "form-input",
  },
  {
    id: 4,
    name: "date",
    min: handleDatePicker(1),
    max: handleDatePicker(180),
    type: "datetime-local",
    placeholder: "When is your wedding",
    label: "Date and Time of Wedding",
    errorMessage: "Date and time should be entered.",
    required: true,
    className: "form-input",
  },
  {
    id: 5,
    name: "address",
    type: "text",
    placeholder: "What is your wedding's address?",
    errorMessage: "Address should be entered.",
    label: "Address",
    required: true,
    className: "form-input",
  },

  {
    id: 6,
    name: "contactName",
    type: "text",
    placeholder: "What is the name of the owner of the contact number?",
    errorMessage: "Please enter contact name .",
    label: "Contact Name",
    required: true,
    pattern: "^.{3,30}$",
    className: "form-input",
  },
  {
    id: 7,
    name: "contactNumber",
    type: "tel",
    placeholder: "What is the phone number of the point of contact?",
    label: "Contact Phone Number",
    errorMessage: "Please enter contact phone number",
    pattern: "^[0-9]*$",
    required: true,
    className: "form-input",
  },
];
