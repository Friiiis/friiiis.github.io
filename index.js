import { getAboutPage } from './pages/about/about.js';
import { getPortfolioPage, getPortfolioSubPage } from './pages/portfolio/portfolio.js';

//https://stackoverflow.com/questions/17847049/css3-custom-animation-triggering-after-hover

var content = document.getElementById('contentContainer');
var upperContentContainer = document.getElementById('upperContentContainer');
var upperContent = document.getElementById('upperContent');

var loadingProgress = 0;

function addToLoadingProgress(params) {
  loadingProgress = loadingProgress + (100/7);
  console.log(loadingProgress);
}

// function getAllContent() {
//   return new Promise(function (resolve, reject){
//     getPortfolioPage()
//       .then((html) => {pages.portfolio = html; addToLoadingProgress()})
//       .then(() => getAboutPage()
//         .then((html) => {pages.about = html; addToLoadingProgress()})
//           .then(() => getPortfolioSubPage("portfolio"))
//             .then((html) => {portfolioSubPages.portfolio = html; addToLoadingProgress()})
//             .then(() => getPortfolioSubPage("mettelineM")
//               .then((html) => {portfolioSubPages.mettelineM = html; addToLoadingProgress()})))
//       .catch((e) => console.log(e))
//   });
// }

function isLoadingFinished() {
  return Math.round(loadingProgress) == 100;
}

function getAllContent(params) {
  return new Promise((resolve, reject) => {
    try {
      getPortfolioPage()
        .then((html) => {
          pages.portfolio = html; 
          addToLoadingProgress();
          isLoadingFinished() ? resolve() : console.log("still loading...");
        });
      getAboutPage()
        .then((html) => {
          pages.about = html; 
          addToLoadingProgress();
          isLoadingFinished() ? resolve() : console.log("still loading...");
        });
      getPortfolioSubPage("portfolio")
        .then((html) => {
          portfolioSubPages.portfolio = html; 
          addToLoadingProgress();
          isLoadingFinished() ? resolve() : console.log("still loading...");
        });
      getPortfolioSubPage("mettelineM")
        .then((html) => {
          portfolioSubPages.mettelineM = html; 
          addToLoadingProgress();
          isLoadingFinished() ? resolve() : console.log("still loading...");
        });
      getPortfolioSubPage("savedPostsOrganizer")
        .then((html) => {
          portfolioSubPages.savedPostsOrganizer = html; 
          addToLoadingProgress();
          isLoadingFinished() ? resolve() : console.log("still loading...");
        });
      getPortfolioSubPage("bottomNav")
        .then((html) => {
          portfolioSubPages.bottomNav = html; 
          addToLoadingProgress();
          isLoadingFinished() ? resolve() : console.log("still loading...");
        });
        getPortfolioSubPage("mikkeller")
        .then((html) => {
          portfolioSubPages.mikkeller = html; 
          addToLoadingProgress();
          isLoadingFinished() ? resolve() : console.log("still loading...");
        });
    } catch (error) {
      reject(error);
    }
  })
}

getAllContent().then((response) => console.log("finished"));

var pages = {
  home: "",
}

var portfolioSubPages = {}

var currentPage = "home";

function changePage(n) {
  if (currentPage == n) {
    return;
  }
  startPageSlider(n);
  currentPage = n;
}

function startPageSlider(navigateTo) {
  slideOutPortfolio(false);

  if (navigateTo === 'home') {    
    //hvis der navigeres til forsiden
    document.getElementById('menuContainerCollapsed').id = 'menuContainerFullWidth';

    //sørger for at navn igen vises, hvis vi er tilbage på startskærmen
    //document.getElementById('name').style.transform = "translate(0px, 0px)";
    document.getElementById('name').style.opacity = 1;
  } else {
    //finder media width
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if (width <= 1024) {
      //smider navn ud af skærmen, hvis vi er på mobil, når startpage collapser
      document.getElementById('name').style.opacity = 0;
    }
    if (currentPage == "home") {
      //hvis vi er på forsiden
      content.innerHTML = pages[navigateTo];
      document.getElementById('menuContainerFullWidth').id = 'menuContainerCollapsed';
    } else {
      //hvis vi ikke er på forsiden, og der skal navigeres til en anden side (som heller ikke er forsiden)
      // document.getElementById('menuContainerCollapsed').id = 'menuContainerFullWidth';
      // setTimeout(function () {
      //   content.innerHTML = pages[navigateTo];
      //   document.getElementById('menuContainerFullWidth').id = 'menuContainerCollapsed';
      // }, 500);

      //nuværende content glider ud af billedet
      content.style.transform = "translate(0px, 100%)";

      //når content er væk, glider den nye side ind
      setTimeout(function () {
        window.scroll(0,0);
        document.getElementsByTagName("body")[0].style.overflowY = "hidden";
        content.innerHTML = pages[navigateTo];
        content.style.transform = "translate(0px, 0%)";

        setTimeout(() => {
          document.getElementsByTagName("body")[0].style.overflowY = "auto";
        }, 500);
      }, 510);     
    }
  }
}

function portfolioElementClicked(n) {
  //finder scroll offset fra toppen, da upperContentContainer skal glide ind midt på skærmen
  var doc = document.documentElement;
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

  upperContentContainer.style.display = "flex";
  upperContentContainer.style.backgroundColor = "var(--portfolio-" + n + "-color)";
  upperContentContainer.style.top = top + "px";
  // upperContent.innerHTML = document.getElementById('portfolio-' + n).textContent;
  upperContent.innerHTML = portfolioSubPages[n];
  //her er man nødt til at sætte et minimalt delay på transform, ellers animeres det ikke
  setTimeout(function(){
    upperContentContainer.style.transform = "translate(0%, 0px)";
  },10)

  setTimeout(function(){
    //fjerner indholdet på siden, så upperContentContainer er det eneste på skærmen
    content.innerHTML = "";

    //positionerer upperContentContainer i toppen af skærmen igen
    upperContentContainer.style.top = "0";
  },310)
}

function slideOutPortfolio(buttonClicked) {
  if (buttonClicked) {
    //tilføjer portfolio-siden igen
    content.innerHTML = pages.portfolio;
  }

  var upper = document.getElementById('upperContentContainer');
  upper.style.transform = "translate(100%, 0px)";
  setTimeout(function(){
    upper.style.display = "none";
  },500)

}

//tilføjer funktioner til window så es6 modules virker:
window.changePage = changePage;
window.portfolioElementClicked = portfolioElementClicked;
window.slideOutPortfolio = slideOutPortfolio;

