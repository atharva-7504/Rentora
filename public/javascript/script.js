// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

//Flash msg
  document.addEventListener("DOMContentLoaded", () => {
    const alert = document.querySelector(".custom-alert");

    if (alert) {
      // Auto remove after 4 seconds
      setTimeout(() => {
        alert.remove();
      }, 4000);

      // Remove immediately on close click
      alert.addEventListener("closed.bs.alert", () => {
        alert.remove();
      });
    }
  });
