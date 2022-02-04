// import createArticle from './article.js';
import {renderTemplate} from './engine.js'

async function start() {
    const articles = await (await fetch('./article.json')).json();
    const articleTemplate = await(await fetch('./article.html')).text();

    console.log(articles);
    
    const main = document.getElementById('content');
    main.innerHTML = articles.map(article => renderTemplate(articleTemplate, article)).join('');

 
}
start()