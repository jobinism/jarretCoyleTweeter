/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const tweets = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

const createTweetElement = function(tweet) {
  const $tweet = $(`
      <article class="showTweets"> 
      <div class="accountNames">
      <div><img src="${tweet.user.avatars}" /> <h2>${tweet.user.name}</h2>
      </div>
    <h2>${tweet.user.handle}</h2>
  </div>
  <div class="actualTweet">
     <p>${escape(tweet.content.text)}</p>
     <hr>
  </div>
  <div class="buttonAndTime">
    <div class="timeTweeted">
      <h6>${timeago.format(tweet.created_at)}</h6>
    </div>
    <div id="socialButtons">
      <i id="flag" class="fa-solid fa-flag"></i>
      <i id="retweet" class="fa-solid fa-retweet"></i>
      <i id="heart" class="fa-solid fa-heart"></i>
    </div>
    </div>
      </article>
    `);
  return $tweet;
};

const renderTweets = function(tweets) {
  for (const el of tweets) {
    const $tweet = createTweetElement(el);
    $('.tweetbox').prepend($tweet);
  }

};

const fetchTweets = function(action) {
  $.get('/tweets', function(data) {
    console.log(data);
    action(data);
  });
};

const resetForm = function() {
  $('#popup').hide();
};

const validateForm = function() {
  const tweetLength = $('.tweet-text').val().length;
  if (tweetLength > 140) {
    $('#popup').slideDown(500);
    $('tweet-text').empty();
    return false;
  } else if (tweetLength <= 0) {
    $('#popup').slideDown(500);
    return false;
  }
  return true;
};
  
$(document).ready(function() {
    
  resetForm();

  fetchTweets(renderTweets);
    

  $('.tweetForm').submit(function(event) {
    event.preventDefault();
    resetForm();
    if (validateForm()) {
      
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: $('.tweetForm').serialize(),
      })
        .then((res) => {
          $('.tweetbox').empty();
          fetchTweets(renderTweets);
          this.reset();
        })
        .catch((err) => {
          console.log("error", err);
        });
    }


  });

      
    
});
