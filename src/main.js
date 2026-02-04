import "./style.css";

import $ from "jquery";
window.$ = $;

var r = document.querySelector(":root");
function setCursorPosition(x, y) {
  r.style.setProperty("--cursor_x_position", x + "px");
  r.style.setProperty("--cursor_y_position", y + "px");
}

$(document).ready(function () {
  setCursorPosition(100, 300);

  var prev_scroll_pos = 0;
  $("#content").on("scroll", function () {
    var scroll_pos = $("#content").scrollTop();
    var up = prev_scroll_pos < scroll_pos ? true : false;
    prev_scroll_pos = scroll_pos;

    var height = {
      about: $("#about").height(),
      projects: $("#projects").height(),
      experience: $("#experience").height(),
      contact: $("#contact").height(),
    };

    if (up) {
      var x = scroll_pos;
      switch (true) {
        case x >= height.about + height.projects + height.experience:
          $("#menu_contact").trigger("click");
          break;
        case x >= height.about + height.projects + 100:
          $("#menu_experience").trigger("click");
          break;
        case x >= height.about + 100:
          $("#menu_projects").trigger("click");
          break;
        default:
          break;
      }
    } else {
      var x = scroll_pos;
      switch (true) {
        case x <= height.about:
          $("#menu_about").trigger("click");
          break;
        case x <= height.about + height.projects:
          $("#menu_projects").trigger("click");
          break;
        case x <= height.about + height.projects + height.experience:
          $("#menu_experience").trigger("click");
          break;
        default:
          break;
      }
    }
  });

  $("body").mousemove(function (e) {
    const { clientY, clientX } = e;
    setCursorPosition(clientX, clientY);
  });
});
