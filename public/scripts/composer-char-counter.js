// makes sure DOM is rendered
$(document).ready(function() {
  // --- our code goes here ---
  console.log('heloow world')
  const $counter = $('.counter')
  $('.tweet-text').on('input', function(event) {
    const textLength = event.target.value.length
    const currentCount = 140 - textLength
    $counter.val(currentCount)
    if (currentCount < 0) {
      $counter.css("color", "red")
    } 
  })
});

