from pygooglenews import GoogleNews

def scrape_article(topic):
    gn = GoogleNews(lang = 'en', country = 'US')
    scraped = gn.search(topic, when = '1h')
    entries = scraped["entries"]

    num_articles = 5
    articles = []

    for entry in entries:
        if num_articles == 0:
            break
        article = {
            "title" : entry["title"],
            "link" : entry["link"],
            "published" : entry["published"],
            "simmary" : entry["summary"],
            "source" : entry["source"]
        }
        articles.append(article)
        num_articles -= 1

    return articles

# entry is a dictionary that can return the information below
#
# title - contains the Headline for the article
# Link - the original link for the article
# Published - the date on which it was published
# Summary - the article summary
# Source - the website on which it was published
# Sub-Articles - list of titles, publishers, and links that are on the same topic