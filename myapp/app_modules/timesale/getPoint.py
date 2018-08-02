# -*- coding: utf-8 -*-
"""
Created on Tue Jun 19 13:07:43 2018

@author: tjsal
"""

import urllib.request
from bs4 import BeautifulSoup
import re
from pandas import DataFrame
from selenium import webdriver
from time import sleep
import requests
import os
datapath = '/Users/ikhwan/capstone/timesale'



def remove_html_tags(data):
    p = re.compile(r'<.*?>')
    return p.sub('\n', data)

def isKorean(text):
    hangul = re.compile('[\u3131-\u3163\uac00-\ud7a3]+')
    result = hangul.findall(text)
    return len(result)

def getSsgPointInfo():
    ssgPointList.clear()
    driver = webdriver.Chrome('/Users/ikhwan/capstone/chromedriver')
    driver.get('http://www.ssgdfm.com/shop/dqPromotion/eventMain?_CAD=KgEvent#HIS_SE')
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    url = 'http://www.ssgdfm.com/shop/dqPromotion/eventMain?_CAD=KgEvent#HIS_SE'
    html2 = requests.get(url).text

    matched =re.search(r'var eventAllCount = (.*);', html2)
    numofevent_ssg = int(matched.group(1).replace("\"",""))
    for i in range(1, numofevent_ssg): #몇개 있는지 확인 후 수정할 것
        pointURL1 = '#listEvent > li:nth-of-type('
        pointURL2 = ') > a > div > div.eventImg > img'
        pointURL = pointURL1 + str(i) + pointURL2
        ssgpointImg = soup.select(pointURL)
        ssg1 = str(ssgpointImg[0])
        ssg2 = ssg1.split('"')
        ssgtsURL = ssg2[5]
        imageURL= 'http:'+ssgtsURL
        imageName = '신세계' + str(i)+'번째 적립금 사진.jpg'
        print(imageURL)
        if isKorean(imageURL) > 0:
            hangul = re.compile('[\u3131-\u3163\uac00-\ud7a3]+')
            result = hangul.findall(imageURL)
            print(result)
            trans = urllib.parse.quote_plus(result[0])
            imageURL = imageURL.replace(result[0], trans)
            print(imageURL)
            #urllib.request.urlretrieve(imageURL,"C:\\Users\\tjsal\\capstoneImage\\" + imageName)
        #else:
            #urllib.request.urlretrieve(imageURL,"C:\\Users\\tjsal\\capstoneImage\\" + imageName)
        pointURL3 = '#listEvent > li:nth-of-type('
        pointURL4 = ') > a'
        pointURL5 = pointURL3 + str(i) + pointURL4
        ssgpointurl = soup.select(pointURL5)
        ssg3 = str(ssgpointurl[0])
        ssg4 = ssg3.split('"')
        ssgtsURL3 = ssg4[1]
        siteURL= 'http://www.ssgdfm.com'+ssgtsURL3
        print(siteURL)
        ssgdateURL = ssg4[8]
        ssgdateURL1 = ssgdateURL.replace('</span>\n<strong class=','')
        dateURL = ssgdateURL1.replace('>','')
        print(dateURL)
        eventName1 = ssg4[10]
        eventName2 = eventName1.replace('</strong>\n<p class=','')
        eventName3 = eventName2.replace('<br/>','')
        eventName = eventName3.replace('>','')
        print(eventName)
        ssgPointList.append([eventName, dateURL, imageURL, siteURL])
    df = DataFrame(ssgPointList)
    df.to_csv(os.path.join(datapath,"ssgPoint.csv"), mode="w",encoding='utf-8')
    # df.to_csv("C:\\Users\\tjsal\\Desktop\\Capstone\\ssgPoint.csv", sep=',')

def lottepoint1():
    driver = webdriver.Chrome('/Users/ikhwan/capstone/chromedriver')
    driver.get('http://kor.lottedfs.com/kr/display/event/customerBenefit')
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    for i in range(1, 6): #몇개 있는지 확인 후 수정할 것
        pointURL1 = '#evtList > ul > li:nth-of-type('
        pointURL2 = ') > a > span.img > img'
        pointURL = pointURL1 + str(i) + pointURL2
        lottepointImg = soup.select(pointURL)
        lot1 = str(lottepointImg[0])
        print(lot1)
        lot2 = lot1.split('src="')
        imageURL = lot2[1]
        imageURL = imageURL.replace('"/>','')
        #imageURL= lottsURL
        imageName = '롯데' + str(i)+'번째 적립금 사진.jpg'
        print(imageURL)
        if isKorean(imageURL) > 0:
            hangul = re.compile('[\u3131-\u3163\uac00-\ud7a3]+')
            result = hangul.findall(imageURL)
            print(result)
            trans = urllib.parse.quote_plus(result[0])
            imageURL = imageURL.replace(result[0], trans)
            print(imageURL)
            #urllib.request.urlretrieve(imageURL,"C:\\Users\\tjsal\\capstoneImage\\" + imageName)
        #else:
            #urllib.request.urlretrieve(imageURL,"C:\\Users\\tjsal\\capstoneImage\\" + imageName)
        pointURL3 = '#evtList > ul > li:nth-of-type('
        pointURL4 = ') > a'
        pointURL5 = pointURL3 + str(i) + pointURL4
        ssgpointurl = soup.select(pointURL5)
        ssg3 = str(ssgpointurl[0])
        ssg4 = ssg3.split("'")
        ssgtsURL3 = ssg4[1]
        siteURL= 'http://kor.lottedfs.com/kr/event/eventDetail?evtDispNo='+ssgtsURL3
        print(siteURL)
        eventName = ssg4[3]
        print(eventName)
        eventDate ='no date'
        lottePointList.append([eventName,eventDate, imageURL, siteURL])

def lottepoint2():
    driver = webdriver.Chrome('/Users/ikhwan/capstone/chromedriver')
    driver.get('http://kor.lottedfs.com/kr/display/event/customerBenefit')
    driver.find_element_by_xpath('/html/body/div[3]/div[1]/div[2]/section[2]/div[2]/ul/li[2]').click()
    sleep(5)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    for i in range(1, 40): #몇개 있는지 확인 후 수정할 것
        pointURL1 = '#evtList > ul > li:nth-of-type('
        pointURL2 = ') > a > span.img > img'
        pointURL = pointURL1 + str(i) + pointURL2
        lottepointImg = soup.select(pointURL)
        lot1 = str(lottepointImg[0])
        lot2 = lot1.split('src="')
        imageURL = lot2[1]
        imageURL = imageURL.replace('"/>','')
        #imageURL= lottsURL
        imageName = '롯데' + str(i+5)+'번째 적립금 사진.jpg'
        print(imageURL)
        if isKorean(imageURL) > 0:
            hangul = re.compile('[\u3131-\u3163\uac00-\ud7a3]+')
            result = hangul.findall(imageURL)
            print(result)
            trans = urllib.parse.quote_plus(result[0])
            imageURL = imageURL.replace(result[0], trans)
            print(imageURL)
            #urllib.request.urlretrieve(imageURL,"C:\\Users\\tjsal\\capstoneImage\\" + imageName)
        #else:
            #urllib.request.urlretrieve(imageURL,"C:\\Users\\tjsal\\capstoneImage\\" + imageName)
        pointURL3 = '#evtList > ul > li:nth-of-type('
        pointURL4 = ') > a'
        pointURL5 = pointURL3 + str(i) + pointURL4
        ssgpointurl = soup.select(pointURL5)
        ssg3 = str(ssgpointurl[0])
        ssg4 = ssg3.split("'")
        ssgtsURL3 = ssg4[1]
        siteURL= 'http://kor.lottedfs.com/kr/event/eventDetail?evtDispNo='+ssgtsURL3
        print(siteURL)
        eventName = ssg4[3]
        print(eventName)
        eventDate ='no date'
        lottePointList.append([eventName,eventDate, imageURL, siteURL])


def getLottePointInfo():
    lottePointList.clear()
    lottepoint1()
    lottepoint2()
    df = DataFrame(lottePointList)
    df.to_csv(os.path.join(datapath,"lottePoint.csv"), mode="w",encoding='utf-8')
    # df.to_csv("C:\\Users\\tjsal\\Desktop\\Capstone\\lottePoint.csv", sep=',')

def shillapoint1():
    driver = webdriver.Chrome('/Users/ikhwan/capstone/chromedriver')
    driver.get('http://www.shilladfs.com/estore/kr/ko/event?actr=1')
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    for i in range(1, 11): #몇개 있는지 확인 후 수정할 것
        pointURL1 = '#detail_tab1 > div > div > ul:nth-of-type('
        pointURL2 = ') > li:nth-of-type('
        pointURL3 = ') > a'
        pointURL4 = ') > div.txt > a > p.date'
        pointURL = pointURL1 + str((i-1)//4+1) + pointURL2+str(i-(((i-1)//4)*4))+pointURL3
        DateURL = pointURL1 + str((i-1)//4+1) + pointURL2+str(i-(((i-1)//4)*4))+pointURL4
        shillapointImg = soup.select(pointURL)
        shilla1 = str(shillapointImg[0])
        shilla2 = shilla1.split('"')
        shillatsURL3 = shilla2[1]
        siteURL= 'http://www.shilladfs.com/'+shillatsURL3
        print(siteURL)
        shillatsURL = shilla2[7]
        imageURL= shillatsURL
        imageName = '신라' + str(i)+'번째 적립금 사진.jpg'
        print(imageURL)
        eventName = shilla2[3]
        print(eventName)
        shillapointDate = soup.select(DateURL)
        shillapointDate1 = str(shillapointDate[0])
        shillapointDate2 = shillapointDate1.replace('<p class="date">','')
        pointDate = shillapointDate2.replace('</p>','')
        print(pointDate)
        if isKorean(imageURL) > 0:
            hangul = re.compile('[\u3131-\u3163\uac00-\ud7a3]+')
            result = hangul.findall(imageURL)
            print(result)
            for k in range(0, len(result)):
                trans = urllib.parse.quote_plus(result[k])
                print(trans)
                imageURL = imageURL.replace(result[k], trans)
            print(imageURL)
            #urllib.request.urlretrieve(imageURL,"C:\\Users\\tjsal\\capstoneImage\\" + imageName)
        #else:
            #urllib.request.urlretrieve(imageURL,"C:\\Users\\tjsal\\capstoneImage\\" + imageName)
        shillaPointList.append([eventName, pointDate, imageURL, siteURL])

def shillapoint2():
    driver = webdriver.Chrome('/Users/ikhwan/capstone/chromedriver')
    driver.get('http://www.shilladfs.com/estore/kr/ko/event?actr=1')
    driver.find_element_by_xpath('//*[@id="detail_tab"]/ul/li[2]/a').click()
    sleep(5)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    for i in range(1, 5): #몇개 있는지 확인 후 수정할 것
        pointURL1 = '#detail_tab2 > div > div > ul > li:nth-of-type('
        pointURL2 = ') > a'
        pointURL3 = ') > div.txt > p.date'
        pointURL = pointURL1 + str(i)+pointURL2
        DateURL = pointURL1 + str(i)+pointURL3
        shillapointImg = soup.select(pointURL)
        shilla1 = str(shillapointImg[0])
        shilla2 = shilla1.split('"')
        shillatsURL3 = shilla2[1]
        siteURL= 'http://www.shilladfs.com/'+shillatsURL3
        print(siteURL)
        shillatsURL = shilla2[7]
        imageURL= shillatsURL
        imageName = '신라' + str(i)+'번째 적립금 사진.jpg'
        print(imageURL)
        eventName = shilla2[3]
        print(eventName)
        shillapointDate = soup.select(DateURL)
        shillapointDate1 = str(shillapointDate[0])
        shillapointDate2 = shillapointDate1.replace('<p class="date">','')
        pointDate = shillapointDate2.replace('</p>','')
        print(pointDate)
        if isKorean(imageURL) > 0:
            hangul = re.compile('[\u3131-\u3163\uac00-\ud7a3]+')
            result = hangul.findall(imageURL)
            print(result)
            for k in range(0, len(result)):
                trans = urllib.parse.quote_plus(result[k])
                print(trans)
                imageURL = imageURL.replace(result[k], trans)
            print(imageURL)
            #urllib.request.urlretrieve(imageURL,"C:\\Users\\tjsal\\capstoneImage\\" + imageName)
        #else:
            #urllib.request.urlretrieve(imageURL,"C:\\Users\\tjsal\\capstoneImage\\" + imageName)
        shillaPointList.append([eventName, pointDate, imageURL, siteURL])

def getShillaPointInfo():
    shillaPointList.clear()
    shillapoint1()
    shillapoint2()
    df_shilla = DataFrame(shillaPointList)
    df_shilla.to_csv(os.path.join(datapath,"shillaPoint.csv"), mode="w",encoding='utf-8')
    # df_shilla.to_csv("C:\\Users\\tjsal\\Desktop\\Capstone\\shillaPoint.csv", sep=',')

shillaPointList=[]
lottePointList = []
ssgPointList = []

def getPoint():
    getSsgPointInfo()
    getShillaPointInfo()
    getLottePointInfo()

getPoint()
