$(document).ready(function() {
  $("article").hover(function() {
    $(this).css(
        "box-shadow", "10px 10px 5px #888"
    );
  }, function() {
    $(this).css(
        "box-shadow", "0px 0px 0px #888"
    );
  });

  $("i").hover(function() {
  $(this).css(
      "color", "yellow"
  );
  }, function() {
  $(this).css(
      "color", "black"
  );
  });

// $("fa-solid fa-flag").hover(function() {
//   $(this).css(
//       "box-shadow", "10px 10px 5px #888"
//   );
// }, function() {
//   $(this).css(
//       "box-shadow", "0px 0px 0px #888"
//   );
// });



});