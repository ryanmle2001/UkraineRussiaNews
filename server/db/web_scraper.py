from pygooglenews import GoogleNews

def scrape_article(topic):
    gn = GoogleNews(lang = 'en', country = 'US')
    scraped = gn.search(topic, when = '1h')
    entries = scraped["entries"]

    num_articles = 5

    return entries[:num_articles]

# entry is a dictionary that can return the information below
#
# title - contains the Headline for the article
# Link - the original link for the article
# Published - the date on which it was published
# Summary - the article summary
# Source - the website on which it was published
# Sub-Articles - list of titles, publishers, and links that are on the same topic