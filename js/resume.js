$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

$(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

}); // End of use strict  







let autocomplete;
let address1Field;
let address2Field;
let postalField;

function initAutocomplete() {
address1Field = document.querySelector("#ship-address");
address2Field = document.querySelector("#address2");
postalField = document.querySelector("#postcode");
// Create the autocomplete object, restricting the search predictions to
// addresses in the US and Canada.
autocomplete = new google.maps.places.Autocomplete(address1Field, {
  componentRestrictions: { country: ["us", "ca"] },
  fields: ["address_components", "geometry"],
  types: ["address"],
});
address1Field.focus();
// When the user selects an address from the drop-down, populate the
// address fields in the form.
autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
// Get the place details from the autocomplete object.
const place = autocomplete.getPlace();
let address1 = "";
let postcode = "";

// Get each component of the address from the place details,
// and then fill-in the corresponding field on the form.
// place.address_components are google.maps.GeocoderAddressComponent objects
// which are documented at http://goo.gle/3l5i5Mr
for (const component of place.address_components) {
  // @ts-ignore remove once typings fixed
  const componentType = component.types[0];

  switch (componentType) {
    case "street_number": {
      address1 = `${component.long_name} ${address1}`;
      break;
    }

    case "route": {
      address1 += component.short_name;
      break;
    }

    case "postal_code": {
      postcode = `${component.long_name}${postcode}`;
      break;
    }

    case "postal_code_suffix": {
      postcode = `${postcode}-${component.long_name}`;
      break;
    }
    case "locality":
      document.querySelector("#locality").value = component.long_name;
      break;
    case "administrative_area_level_1": {
      document.querySelector("#state").value = component.short_name;
      break;
    }
    case "country":
      document.querySelector("#country").value = component.long_name;
      break;
  }
}

address1Field.value = address1;
postalField.value = postcode;
// After filling the form with address components from the Autocomplete
// prediction, set cursor focus on the second address line to encourage
// entry of subpremise information such as apartment, unit, or floor number.
address2Field.focus();
}

window.initAutocomplete = initAutocomplete;



function phoneNumberFormatter() {
// grab the value of what the user is typing into the input
const inputField = document.getElementById('phone-number');

// next, we're going to format this input with the `formatPhoneNumber` function, which we'll write next.
const formattedInputValue = formatPhoneNumber(inputField.value);

// Then we'll set the value of the inputField to the formattedValue we generated with the formatPhoneNumber
inputField.value = formattedInputValue;
}

function formatPhoneNumber(value) {
// if input value is falsy eg if the user deletes the input, then just return
if (!value) return value;

// clean the input for any non-digit values.
const phoneNumber = value.replace(/[^\d]/g, '');

// phoneNumberLength is used to know when to apply our formatting for the phone number
const phoneNumberLength = phoneNumber.length;

// we need to return the value with no formatting if its less than four digits
// this is to avoid weird behavior that occurs if you  format the area code too early
if (phoneNumberLength < 4) return phoneNumber;

// if phoneNumberLength is greater than 4 and less the 7 we start to return
// the formatted number
if (phoneNumberLength < 7) {
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
}

// finally, if the phoneNumberLength is greater then seven, we add the last
// bit of formatting and return it.
return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
  3,
  6
)}-${phoneNumber.slice(6, 9)}`;
}








function addInput() {
  var input = document.createElement('input');
  input.type = 'file';
  input.class = 'upload';
  input.className = 'upload';

 
    var container = document.getElementById('input');
    container.appendChild(input);
}