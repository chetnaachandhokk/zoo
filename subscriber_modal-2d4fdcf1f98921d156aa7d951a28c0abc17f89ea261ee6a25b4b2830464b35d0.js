(function($, window) {
  DelhiZoo.subscriber = {
    init: function() {
      DelhiZoo.subscriber.allFormValidation();
      DelhiZoo.subscriber.handleSubscriberSubmission();
    },
    vars: {},

    handleSubscriberSubmission: function() {
      $(".js-subscriber-form button").on("click", function(e) {
        e.preventDefault();

        var form = $(".js-subscriber-form");
        if (form.valid()) {
          $("#loading-overlay").show();
          $.ajax({
            url: form.attr("action"),
            type: "POST",
            data: form.serialize(),
            success: function(response) {
              $("#loading-overlay").hide();
              if (response.status == "success") {
                $(".js-subscribe-modal-div").addClass("dn");
                $(".js-subscriber-thankyou-div").removeClass("dn");
              } else if (response.status == "invalid_captcha") {
                $(".js-captcha-refresh-button a").click();
                $(".js-invalid-captcha-message").removeClass("dn");
              } else if (response.status == "error") {
                alert("Please try after some time.");
              }
            },
            error: function(response) {
              console.log(response);
            }
          });
        }
      });
    },
    allFormValidation: function() {
      $("#new_subscriber").validate({
        errorClass: "error_message",
        // Specify validation rules
        rules: {
          "subscriber[email]": {
            required: true,
            email: true
          }
        },
        // Specify validation error messages
        messages: {
          "subscriber[email]": {
            required: "Please enter your email",
            email: "Please enter a valid email"
          }
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {
          if (form.valid()) {
            form.submit();
          }
        }
      });
    }
  };

  window.DelhiZoo = DelhiZoo;
  $(document).ready(DelhiZoo.subscriber.init);
})(jQuery, this);
