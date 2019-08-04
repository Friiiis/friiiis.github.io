import { loadHTMLFile } from '../../loadHTMLFile.js';

export function getPortfolioPage() {
    return new Promise(function (resolve, reject){
        loadHTMLFile("./pages/portfolio/portfolio.html")
            .then((html) => resolve(html))
            .catch((error) => reject(error))
    });
}

export function getPortfolioSubPage(name) {
    return new Promise(function (resolve, reject){
        loadHTMLFile("./pages/portfolio/" + name + "/" + name + ".html")
            .then((html) => resolve(html))
            .catch((error) => reject(error))
    });
}