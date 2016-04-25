/* Feedr js */

var $article = $("article");
var $mainContent = $("#main");

//Nav and search variables
var $dropdownButton = $(".dropdown-button");
var $dropdownMenu = $(".dropdown-menu");
var $nav = $("nav");
var $navItems = $("nav ul ul li");
var $search = $("#search");
var $mashableValue = $("#mashable");
var $redditValue = $("#reddit");
var $diggValue = $("#digg");
var $initialValue = $("#initial-value span");

//PopUp variables
var $popUp = $("#popUp");
var $closePopUp = $(".closePopUp");
var $popUpTitle = $("#popUp h1");
var $popUpContent = $("#popUp p");
var $popUpLink = $(".popUpAction");

//Handlebars Template variables
var source = $("#article-template").html();
var template = Handlebars.compile(source);

//Main view
$(document).ready(function(){
  $popUp.removeClass("hidden");
  searchReddit();
  searchDigg();
  searchMashable();
})

$dropdownButton.hover(function () {
  $dropdownMenu.addClass("open");
});

$search.click(function(){
  switch ($initialValue.text()) {
    case 'Reddit':
      searchReddit();
      break;
    case 'Digg':
      searchDigg();
      break;
    case 'Mashable':
      searchMashable();
      break;
  }
})

function Article(options) {
  this.title = options.title;
  this.impressions = options.impressions;
  this.tag = options.tag;
  this.image = options.image;
  this.link = options.link;
  this.description = options.description;
}

$redditValue.click(function() {
  $dropdownMenu.removeClass("open");
  $initialValue.text("Reddit");
})


// REDDIT Search
function searchReddit() {
  $popUp.removeClass("hidden");
  $mainContent.empty();
  var url = 'https://www.reddit.com/top.json';
  $.ajax({
    url: url,
    success: function(response){
        $popUp.addClass("hidden");
        var articleData = response.data.children
        for (i = 0; i < articleData.length; i++) {
          var article = new Article({
            title: articleData[i].data.title,
            impressions: articleData[i].data.score,
            tag: articleData[i].data.subreddit,
            image: articleData[i].data.thumbnail,
            link: articleData[i].data.url,
            description: " "
          });
          $mainContent.append(template(article));
        }
        // On click of article title, display pop-up
        var $title = $(".article .articleContent h3");
        $title.click(changePopUp);
    },
    error: function () {
      alert("Can't load because of error.");
    }
  })
}


$mashableValue.click(function() {
  $dropdownMenu.removeClass("open");
  $initialValue.text("Mashable");
})


// MASHABLE Search
function searchMashable() {
  $popUp.removeClass("hidden");
  $mainContent.empty();
  var url = 'http://feedr-api.wdidc.org/mashable.json';
  $.ajax({
    url: url,
    success: function(response){
      $popUp.addClass("hidden");
      var articleData = response.new;
      for (i = 0; i < articleData.length; i++) {
        var article = new Article({
          title: articleData[i].title,
          impressions: articleData[i].shares.total,
          tag: articleData[i].channel,
          image: articleData[i].responsive_images[0].image,
          link: articleData[i].link,
          description: articleData[i].content.plain
        });
        $mainContent.append(template(article));
      }
      // On click of article title, display pop-up
      var $title = $(".article .articleContent h3");
      $title.click(changePopUp);
    },
    error: function () {
      alert("Can't load because of error.");
    }
  })
}

$diggValue.click(function() {
  $dropdownMenu.removeClass("open");
  $initialValue.text("Digg");
})


// DIGG Search
function searchDigg() {
  $popUp.removeClass("hidden");
  $mainContent.empty();
  var url = 'http://feedr-api.wdidc.org/digg.json';
  $.ajax({
    url: url,
    success: function(response){
      $popUp.addClass("hidden");
      var articleData = response.data.feed;
    // console.log(response);
      for (i = 0; i < articleData.length; i++) {
        var article = new Article({
          title: articleData[i].content.title,
          impressions: articleData[i].diggs.count,
          tag: articleData[i].content.domain_name,
          image: articleData[i].content.media.images[0].url,
          link: articleData[i].content.url,
          description: articleData[i].content.description
        });
        $mainContent.append(template(article));
      }
      // On click of article title, display pop-up
      var $title = $(".article .articleContent h3");
      $title.click(changePopUp);
    },
    error: function () {
      alert("Can't load because of error.");
    }
  })
}

// Populate popup with article info
function changePopUp (e) {
  e.preventDefault();
  var $clickedTitle = $(e.target);
  var $selectedArticle = $clickedTitle.closest('.article');
  var titleText = $selectedArticle.find('.title').text();
  var contentText = $selectedArticle.find('.content').text();
  var storyLink = $selectedArticle.find('.story-link').attr("href");
  $popUpTitle.html(titleText);
  $popUpContent.html(contentText);
  $popUpLink.attr("href", storyLink);
  $popUp.removeClass("loader hidden");
}

// Close popup
$closePopUp.click(function(e) {
  e.preventDefault();
  $popUp.addClass("loader hidden");
})
