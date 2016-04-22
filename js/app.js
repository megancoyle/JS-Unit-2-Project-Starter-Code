/*
  Feedr js
*/

var $article = $("article");
var $popUp = $("#popUp");
var $closePopUp = $(".closePopUp")
var $search = $("#search");
var $nav = $("nav");
var $mashableValue = $("#mashable");
var $redditValue = $("#reddit");
var $diggValue = $("#digg");
var $initialValue = $("#initial-value span");
var $mainContent = $("#main");
var source = $("#article-template").html();
var template = Handlebars.compile(source);
var $title = $(".article .articleContent h3");

// On click of article title, display pop-up
$title.click(function(e) {
  e.preventDefault();
  console.log("click");
  $popUp.removeClass("loader hidden");
})
$closePopUp.click(function(e) {
  e.preventDefault();
  $popUp.addClass("loader hidden");
})

$redditValue.click(function() {
  $mainContent.html("");
  $initialValue.text("Reddit");
  searchReddit();
})

// REDDIT API
// data.children.data.title
// data.children.data.url //URL to content, add to title link
// data.children.data.thumnail //URL for image
// data.children.data.url //URL to content, add read more link
// data.children.data.subreddit //category
// data.children.data.score

function searchReddit() {
  var url = 'https://www.reddit.com/top.json';
  $.get(url, function(response){
      var baseUrl = response.data.children
      for (i = 0; i < baseUrl.length; i++) {
        var titleArticle = baseUrl[i].data.title;
        var contentUrl = baseUrl[i].data.url;
        var featureImage = baseUrl[i].data.thumbnail;
        var category = baseUrl[i].data.subreddit;
        var count = baseUrl[i].data.score;
        var article = {
          title: titleArticle,
          impressions: count,
          tag: category,
          image: featureImage,
          link: contentUrl
        }
        $("#main").append(template(article));
      }
  })
}


$mashableValue.click(function() {
  $mainContent.html("");
  $initialValue.text("Mashable");
  searchMashable();
})

// MASHABLE API
// new.title
// new.link // link to full content
// new.feature_image //URL for image
// new.content
// new.channel // category
// new.shares.total

function searchMashable() {
  var url = 'http://feedr-api.wdidc.org/mashable.json';
  $.get(url, function(response){
      var baseUrl = response.new
      for (i = 0; i < baseUrl.length; i++) {
        var titleArticle = baseUrl[i].title;
        var contentUrl = baseUrl[i].link;
        var featureImage = baseUrl[i].responsive_images[0].image;
        var category = baseUrl[i].channel;
        var count = baseUrl[i].shares.total;
        var article = {
          title: titleArticle,
          impressions: count,
          tag: category,
          image: featureImage,
          link: contentUrl
        }
        $("#main").append(template(article));
      }
  })
}

$diggValue.click(function() {
  $mainContent.html("");
  $initialValue.text("Digg");
  searchDigg();
})

// DIGG API
// data.feed.content.title
// data.feed.content.url // Link to full content
// data.feed.content.media.images[0].url //URL for image
// data.feed.content.description
// data.feed.content.domain_name // category
// data.feed.diggs.count

function searchDigg() {
  var url = 'http://feedr-api.wdidc.org/digg.json';
  $.get(url, function(response){
      var baseUrl = response.data.feed
    // console.log(response);
      for (i = 0; i < baseUrl.length; i++) {
        var titleArticle = baseUrl[i].content.title;
        var contentUrl = baseUrl[i].content.url;
        var featureImage = baseUrl[i].content.media.images[0].url;
        var category = baseUrl[i].content.domain_name;
        var count = baseUrl[i].diggs.count;
        var article = {
          title: titleArticle,
          impressions: count,
          tag: category,
          image: featureImage,
          link: contentUrl
        }
        $("#main").append(template(article));
      }
  })
}
