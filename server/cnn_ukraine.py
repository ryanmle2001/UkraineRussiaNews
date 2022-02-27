from selenium import webdriver
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import time


def setup_driver(headless=True) -> webdriver:
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--ignore-certificate-errors')
    chrome_options.add_argument('--ignore-ssl-errors')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    if headless:
        chrome_options.add_argument('-headless')
    driver = webdriver.Chrome('chromedriver',chrome_options=chrome_options)
    return driver

def extract_articles(DATE):
    URL = 'https://www.cnn.com/europe/live-news/ukraine-russia-news-' + DATE + '/index.html'
    driver = setup_driver()
    driver.get(URL)
    time.sleep(1)
    page_soup = BeautifulSoup(driver.page_source, "html.parser")
    articles = page_soup.find_all('article', {"class": "sc-bwzfXH sc-eXEjpC iGQwpp"})
    driver.quit()
    aux = {}
    aux['source_url'] = URL
    aux['articles'] = articles
    return aux

"""
News fields
newsId: (div id=post_and_bottom, article class = [take id from here]}
city: String 
date: Datetime (current time - <span class= timeAlert>) 
header: String 
body: String 
image: String 
url: String
"""
def transform_data(articles_object):
    transformed_list = []
    datetime_object = datetime.now()
    for item in articles_object['articles']:
      aux_obj = {}
      aux_obj['newsId'] = item.get('id')
      aux_obj['city'] = 'Ukraine'
      # datetime
      ex_time = item.find('span', {'class':'timeAlert sc-iujRgT llASnG'}).text
      ex_time = ex_time.split()
      ex_time_hr_num = 0
      ex_time_min_num = 0
      if 'hr' in ex_time:
        ex_time_hr_num = int(ex_time[int(ex_time.index('hr')-1)])
      if 'min' in ex_time:
        ex_time_min_num = int(ex_time[int(ex_time.index('min')-1)])
      ex_t1_delta = timedelta(hours=ex_time_hr_num, minutes=ex_time_min_num)
      ex_stamp_time = (datetime_object - ex_t1_delta)
      aux_obj['date'] = str(ex_stamp_time)
      aux_obj['header'] = item.find('h2', {'class': 'sc-dfVpRl kvaBeP'}).text
      # body
      ex_body = item.find_all('p', {'class': 'sc-gZMcBi render-stellar-contentstyles__Paragraph-sc-9v7nwy-2 dCwndB'})
      # making into list because each paragraph is separated tags
      body = ''
      for body_item in ex_body:
        if body_item.text != '':
          body = body + ' ' + body_item.text
      aux_obj['body'] = body
      # image
      ex_img = item.find('img')
      if ex_img:
        img = ex_img.get('src')
      else:
        img = None
      aux_obj['image'] = img
      aux_obj['url'] = articles_object['source_url']
      transformed_list.append(aux_obj)
    return transformed_list

def main():
    DATE = '02-26-22'
    articles_object = extract_articles(DATE)
    model_articles = transform_data(articles_object)
    display(model_articles)

def start():
  import sys
  sys.path.insert(0, '/Users/ryanle/Downloads/chromedriver')


main()