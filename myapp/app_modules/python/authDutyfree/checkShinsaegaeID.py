# -*- coding: utf-8 -*-
"""
Created on Fri Jun  8 15:00:51 2018

@author: ikhwan
"""

from selenium import webdriver
from bs4 import BeautifulSoup
import sys
#https://www.ssgdfm.com/shop/main success
#https://www.ssgdfm.com/shop/login/loginPopup Fail

def checkID():
    driver = webdriver.Chrome('/Users/ikhwan/capstone/chromedriver')
    driver.get('https://www.ssgdfm.com/shop/main')
    driver.find_element_by_xpath('//*[@id="nSTopNav"]/div/div/ul/li[3]/a').click()
    driver.implicitly_wait(3)
    window_before = driver.window_handles[0]
    window_after = driver.window_handles[1]

    driver.switch_to_window(window_after)
    driver.find_element_by_name('userId').send_keys(sys.argv[1])
    driver.find_element_by_name('password').send_keys(sys.argv[2])
    driver.find_element_by_xpath('//*[@id="loginForm"]/div/div[2]/input').click()
    driver.implicitly_wait(3)
    try:
        result = driver.current_url
    except :
        driver.switch_to_window(window_before)
        result = driver.current_url

    if result =='https://www.ssgdfm.com/shop/main' :
       print('ssg success')

    elif result =='http://www.ssgdfm.com/shop/mypage/main' :
          print('ssg success')
    elif result =='https://www.ssgdfm.com/shop/login/loginPopup' :
         print('ssg fail')
    # else :
    #     print('ssg fail')




checkID()
