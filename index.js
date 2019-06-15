//https://stackoverflow.com/questions/17847049/css3-custom-animation-triggering-after-hover
var portfolioPage = document.getElementById('portfolioPage').textContent;
var aboutPage = document.getElementById('aboutPage').textContent;
var content = document.getElementById('contentContainer');
var upperContent = document.getElementById('upperContentContainer');

var pages = [
  "",
  document.getElementById('portfolioPage').textContent,
  document.getElementById('aboutPage').textContent
];

var currentPage = 0;
var root = document.documentElement;

function changePage(n) {
  if (currentPage == n) {
    return;
  }
  startPageSlider(n);
  currentPage = n;
}

function startPageSlider(navigateTo) {
  slideOutPortfolio(false);

  if (navigateTo == 0) {
    //hvis der navigeres til forsiden
    document.getElementById('menuContainerCollapsed').id = 'menuContainerFullWidth';

    //sørger for at navn og email igen vises, hvis vi er tilbage på startskærmen
    //document.getElementById('name').style.transform = "translate(0px, 0px)";
    document.getElementById('name').style.opacity = 1;
  } else {
    //finder media width
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if (width <= 640) {
      //smider navn og email ud af skærmen, hvis vi er på mobil, når startpage collapser
      //document.getElementById('name').style.transform = "translate(-250px, 0px)";
      document.getElementById('name').style.opacity = 0;
    }
    if (width <= 1024) {
      document.getElementById('name').style.opacity = 0;
    }
    if (currentPage == 0) {
      //hvis vi er på forsiden
      content.innerHTML = pages[navigateTo];
      document.getElementById('menuContainerFullWidth').id = 'menuContainerCollapsed';
    } else {
      //hvis vi ikke er på forsiden, og der skal navigeres til en anden side (som heller ikke er forsiden)
      document.getElementById('menuContainerCollapsed').id = 'menuContainerFullWidth';
      setTimeout(function () {
        content.innerHTML = pages[navigateTo];
        document.getElementById('menuContainerFullWidth').id = 'menuContainerCollapsed';
      }, 500);
    }
  }
}

function portfolioElementClicked(n) {
  //finder scroll offset fra toppen, da upperContentContainer skal glide ind midt på skærmen
  var doc = document.documentElement;
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

  var upper = document.getElementById('upperContentContainer');
  upper.style.display = "flex";
  upper.style.backgroundColor = "var(--portfolio-" + n + "-color)";
  upper.style.top = top + "px";
  document.getElementById('upperContent').innerHTML = document.getElementById('portfolio-' + n).textContent;
  //her er man nødt til at sætte et minimalt delay på transform, ellers animeres det ikke
  setTimeout(function(){
    upper.style.transform = "translate(0%, 0px)";
  },10)

  setTimeout(function(){
    //fjerner indholdet på siden, så upperContentContainer er det eneste på skærmen
    content.innerHTML = "";

    //positionerer upperContentContainer i toppen af skærmen igen
    upper.style.top = "0";
  },310)
}

function slideOutPortfolio(buttonClicked) {
  if (buttonClicked) {
    //tilføjer portfolio-siden igen
    content.innerHTML = pages[1];
  }

  var upper = document.getElementById('upperContentContainer');
  upper.style.transform = "translate(100%, 0px)";
  setTimeout(function(){
    upper.style.display = "none";
  },500)

}
