import { loadHTMLFile } from '../../loadHTMLFile.js';

export function getAboutPage() {
    return new Promise(function (resolve, reject){
        loadHTMLFile("./pages/about/about.html")
            .then((html) => resolve(html))
            .catch((error) => reject(error))
    });
}