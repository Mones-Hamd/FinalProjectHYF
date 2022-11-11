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
    name: "title",
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
    name: "bride-name",
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
    name: "groom-name",
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
    max: handleDatePicker(60),
    type: "datetime-local",
    placeholder: "When is your wedding",
    label: "Date and Time of Wedding",
    errorMessage: "Date and time should be entered.",
    required: true,
    className: "date-input",
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
    name: "poC_name",
    type: "text",
    placeholder: "Who is point of contact of your wediing?",
    errorMessage: "PoC name should be entered.",
    label: "PoC Name",
    required: true,
    pattern: "^.{3,30}$",
    className: "form-input",
  },
  {
    id: 7,
    name: "poC_phone_number",
    type: "tel",
    placeholder: "What is the phone number of the point of contact?",
    label: "PoC Phone Number",
    errorMessage: "PoC phone number should be entered.",
    pattern: "^[0-9]*$",
    required: true,
    className: "form-input",
  },
];
