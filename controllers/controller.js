const axios = require("axios");
const cheerio = require("cheerio");

const newspapers = [
    {
        name:'bbc',
        address: 'https://www.bbc.com/news/topics/cvenzmgyww4t/space-exploration',
        base:'https://www.bbc.com'
    },
    {
        name:'euronews',
        address: 'https://www.euronews.com/next/tag/space-technology',
        base:'https://www.euronews.com'
    },
    {
        name:'foxnews',
        address: 'https://www.foxnews.com/science',
        base:'https://www.foxnews.com'
    },
    {
        name:'livescience',
        address: 'https://www.livescience.com/space',
        base:''
    },
    {
        name:'cnn',
        address: 'https://edition.cnn.com/specials/space-science',
        base:'https://edition.cnn.com'
    },
    {
        name:'nytimes',
        address: 'https://www.nytimes.com/section/science',
        base:'https://www.nytimes.com'
    },
    {
        name:'abcnews',
        address: 'https://abcnews.go.com/Technology',
        base:''
    }

    
]

const articles = []

exports.findAll = (req, res) => {
    newspapers.forEach(newspaper => {
        axios.get(newspaper.address)
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)
    
                $('a:contains("space")', html).each(function () {
                    const title = $(this).text()
                    const url = $(this).attr('href')
                    articles.push({
                        title,
                        url: newspaper.base + url,
                        source: newspaper.name
                })
            })
        })
    })
    return res.send(articles);
}

exports.findOne = (req, res) => {
        const newspaperId = req.params.id

        const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
        const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base

        axios.get(newspaperAddress)
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)
                const specificArticles = []
                $('a:contains("space")', html).each(function () {
                    const title = $(this).text()
                    const url = $(this).attr('href')
                    specificArticles.push({
                        title,
                        url: newspaperBase + url,
                        source: newspaperId
                    })
                })
                res.json(specificArticles)
            }).catch(err => console.log(err))
}
