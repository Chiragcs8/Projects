from bs4 import BeautifulSoup
import requests
import pandas as pd

url = "https://www.amazon.com/s?k=hp+victus+gaming+laptop&crid=1Q1URL0Z8FJWQ&sprefix=hp+victus+%2Caps%2C308&ref=nb_sb_ss_pltr-data-refreshed_2_10"

Header = ({'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','Accept-Language':'en-US,en;q=0.5'})

webpage = requests.get(url, headers=Header)

type(webpage.content)

soup = BeautifulSoup(webpage.content, "html.parser")

# print(soup)

links = soup.find_all("a", attrs={'class' : 'a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal'})

link = links[2].get('href')
# print(link)

product_list = "https://www.amazon.com/" + link

# print(product_list)

new_webpage = requests.get(product_list, headers=Header)

# print(new_webpage)

new_soup = BeautifulSoup(new_webpage.content, "html.parser")

# print(new_soup)

print(new_soup.find("span", attrs={"id": "productTitle"}).text.strip())

print(new_soup.find("span", attrs={"class": "a-price a-text-price a-size-medium"}).find("span", attrs={"class":'a-offscreen'}).text.strip())

