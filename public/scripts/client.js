/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const $container = $('<article class="showTweets"></article>')

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
}

//   const renderTweet = (tweet) => {
//   const $tweet = $(`
//   <div class="tweet">
//     <h3>${tweet.name, tweet.avatars, tweet.handle}</h3>
//     <h2>${tweet.content.text}</h2>
//     <h3>${tweet.created_at}</h3>
  
//   </div>
//   `);
//   return $tweet
//   };
  
//     for (const el of tweets) {
//     const output = []
//     output.push(el)
//     return output;
//     }
//     console.log(output);

    // const fetchTweet = () => {
    //   $.ajax({
    //     type: 'GET',
    //     url: '/tweets',
    //     success: (data) => {
    //       console.log(data);
    //       setTimeout(() => {
    //         $container.empty();
    //         for (const tweet of data){
    //         let $tweet = renderTweet(tweet);
    //         $container.prepend($tweet);
    //       }
    //       })
    //     }
    //   })
    // }
    // const $form = $('.new-tweet');

  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="showTweets"> 
      <div class="accountNames">
      <div><img src="${tweet.user.avatars}" /> <h2>${tweet.user.name}</h2>
      </div>
    <h2>${tweet.user.handle}</h2>
  </div>
  <div class="actualTweet">
     <p>${tweet.content.text}</p>
     <hr>
  </div>
  <div class="buttonAndTime">
    <div class="timeTweeted">
      <p>${Date(tweet.created_at)}</p>
    </div>
    <div class="socialButtons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
    </div>
      </article>
    `)
    return $tweet;
  }

  const renderTweets = function(tweets) {
    for (const el of tweets) {
      const $tweet = createTweetElement(el);
      $('.tweetbox').prepend($tweet);
    }

  }

  const fetchTweets = function(action) {
    $.get('/tweets', function(data) {
      console.log(data)
      action(data)
    })
  }

  // const submitTweets = function() {


  // }

  
  
  $(document).ready(function() {
    
    fetchTweets(renderTweets);
    

    $('.tweetForm').submit(function(event) {
      event.preventDefault()
      $.ajax ({
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
        console.log("error", err)
      })
    })
   
});
