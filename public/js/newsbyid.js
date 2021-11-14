async function searchById(id) {
    const urlBase = "http://localhost:8000/news";
    const listNews = document.getElementById("news");
    const tag = document.getElementById("tag").value;

    let text = "";
    let myHeaders = new Headers();
    let url = urlBase;

    if (id != "") {
        url = url + "/" + id
    } else if (tag != "") {
        url = url + "/" + tag;
    }
    listNews.innerHTML = "";
    
    const myInit = { method: "GET", headers: myHeaders };
    const myRequest = new Request(url, myInit);

    await fetch(myRequest).then(async function (response) {
        if(!response.ok) {
            listNews.innerHTML = "No news available at the moment!";
        } else {
            const news = await response.json();
            for (const article of news) {
                text +=`
                        <hr><div>
                <h4>${article.title}</h4>
                URL: <a href="${article.url}">${article.url}</a></br>
                Source: ${article.source}</br>
                </div>`;
            }
            listNews.innerHTML = text;
        }
    });
}