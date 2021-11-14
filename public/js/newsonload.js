window.onload = () => {
    (async () => {
        const urlBase = "http://localhost:8000/news";
        const listNews = document.getElementById("news");
        let text = "";
        var myHeaders = new Headers();

        var myInit = { method: "GET", headers: myHeaders };
        var myRequest = new Request(`${urlBase}`, myInit);

        listNews.innerHTML = "";

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
    })();
}