from pygooglenews import GoogleNews
from bs4 import BeautifulSoup
from gensim.summarization import summarize
from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance
from urllib.request import urlopen
import numpy as np
import networkx as nx
import nltk
import requests
nltk.download('stopwords')


def scrape_article(topic):
    gn = GoogleNews(lang = 'en')
    scraped = gn.search(topic, when = '7d')
    entries = scraped["entries"]

    num_articles = 5
    articles = []
    for entry in entries:
        if num_articles == 0:
            break

        summary = None
        try:
            summary = article_summary(entry["link"])
        except:
            summary = entry["title"]

        article = {
            "newsId": entry["link"],
            "city": topic,
            "date" : entry["published"],
            "header" : entry["title"],
            "body": summary,
            "image": get_image(entry["link"]),
            "link" : entry["link"]
        }

        articles.append(article)
        num_articles -= 1

    return articles



def get_image(url):
    try:
        html = urlopen(url)
        soup = BeautifulSoup(html, 'html.parser')
        image = soup.find('img')["src"]
    except:
        image = None

    return image

def article_summary(url):
    page = requests.get(url).text

    soup = BeautifulSoup(page)

    p_tags = soup.find_all("p")

    p_tags_text = [tag.get_text().strip() for tag in p_tags]

    sentence_list = [sentence for sentence in p_tags_text if not '\n' in sentence]
    sentence_list = [sentence for sentence in sentence_list if '.' in sentence]
    article = ' '.join(sentence_list)

    summary = summarize(article, ratio=0.3).replace('\n', ' ')
    return summary

def read_article(url):
    page = requests.get(url).text

    soup = BeautifulSoup(page)

    p_tags = soup.find_all("p")

    p_tags_text = [tag.get_text().strip() for tag in p_tags]

    sentences = [sentence for sentence in p_tags_text if not '\n' in sentence]
    sentences = [sentence for sentence in sentences if '.' in sentence]
    return sentences


def sentence_similarity(sent1, sent2, stopwords=None):
    if stopwords is None:
        stopwords = []

    sent1 = [w.lower() for w in sent1]
    sent2 = [w.lower() for w in sent2]

    all_words = list(set(sent1 + sent2))

    vector1 = [0] * len(all_words)
    vector2 = [0] * len(all_words)

    for w in sent1:
        if w in stopwords:
            continue
        vector1[all_words.index(w)] += 1

    for w in sent2:
        if w in stopwords:
            continue
        vector2[all_words.index(w)] += 1

    return 1 - cosine_distance(vector1, vector2)


def build_similarity_matrix(sentences, stop_words):
    # Create an empty similarity matrix
    similarity_matrix = np.zeros((len(sentences), len(sentences)))

    for idx1 in range(len(sentences)):
        for idx2 in range(len(sentences)):
            if idx1 == idx2:  # ignore if both are same sentences
                continue
            similarity_matrix[idx1][idx2] = sentence_similarity(sentences[idx1], sentences[idx2], stop_words)

    return similarity_matrix


def generate_summary(url, top_n=5):
    stop_words = stopwords.words('english')
    summarize_text = []

    sentences = read_article(url)

    sentence_similarity_martix = build_similarity_matrix(sentences, stop_words)

    sentence_similarity_graph = nx.from_numpy_array(sentence_similarity_martix)
    scores = nx.pagerank(sentence_similarity_graph)

    ranked_sentence = sorted(((scores[i], s) for i, s in enumerate(sentences)), reverse=True)

    for i in range(top_n):
        summarize_text.append("".join(ranked_sentence[i][1]))

    summary = ". ".join(summarize_text)
    return summary

