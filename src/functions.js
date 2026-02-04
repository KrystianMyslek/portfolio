import $ from "jquery";
window.$ = $;

export function menuClick(_this) {
  $("#menu li").removeClass("active");
  _this.addClass("active");
}

export function sendMessage() {
  var send = true;
  ["name", "email", "message"].forEach((field) => {
    var empty = $("<div>")
      .addClass(field + "_empty text-center text-red-600")
      .html("To pole nie może być puste");

    if (
      $('form [name="' + field + '"]')
        .val()
        .replaceAll(/\s/g, "") == ""
    ) {
      send = false;
      $('form [name="' + field + '"]').before(empty);
      setTimeout(
        function (field) {
          $("form ." + field + "_empty").hide();
        },
        5000,
        field,
      );
    }
  });

  if (send) {
    $.ajax({
      url: "server/message.php",
      method: "POST",
      data: $("form").serialize(),
    }).done(function (response) {
      if (response == "OK") {
        $(".response").show();
        setTimeout(function () {
          $(".response").hide();
        }, 5000);
      }
    });
  }
}
