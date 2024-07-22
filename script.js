const API_KEY = "CE8p6gzVrDbFXDXcsGhKjozZ0cuNmKoeSH1jfk8S";
const url =
  "https://api.thenewsapi.com/v1/news/all?";

window.addEventListener('load', () => fetchNews("india"));

async function fetchNews(query) {
    const res = await fetch(`${url}api_token=${API_KEY}&search=${query}&language=en`);
    const news = await res.json();
    console.log(news);
    bindData(news.data);
}

function reload(){
    window.location.reload();
}

function bindData(data) {
    const cardContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    cardContainer.innerHTML = "";

    data.forEach((article) => {
        if (!article.image_url) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,data){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = data.image_url;
    newsTitle.innerHTML = data.title;
    newsDesc.innerHTML = data.description;

    const date = new Date(data.published_at).toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${data.source} • ${date}`;
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(data.url, "_blank");
    });

}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

const icon = document.getElementById("icon");
const logo = document.getElementById("logo");
icon.onclick = function(){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        icon.src = "/assets/sun.png";
        logo.src = "/assets/logo-dark.png";
    }
    else{
        icon.src = "/assets/moon.png";
        logo.src = "/assets/logo-light.png";
    }
}