# Budget Tracker 📝
Budget Tracker is a budget-oriented bookkeeping website. You can record daily expenses and incomes according to categories, set a monthly budget and provide charts to track consumption situations.

Budget Tracker 是一個以預算為導向的記帳軟體。可以依照類別記錄每天的支出和收入，設置每個月的消費預算以確保不超支，並提供收入、支出類別月比例及整年度結餘分析圖追蹤消費情況。

![Desktop - 2 (2)](https://user-images.githubusercontent.com/101781321/224468959-3ff4e813-a5d2-4a6e-9123-02af4c3d8242.png)

## Live DEMO
https://budget-tracker-tw.web.app/


## Test Account
Since Budget Tracker is used to record personal income, expense and budget, it needs to be logged in.The following is the test account and password.

由於 Budget Tracker 是用來記錄個人的收支及預算，需要登入才可以使用。以下是測試帳號及密碼。

| Account | Password |
|-----|--------|
| test@test.com | test1234 |


## Skills Structure
Budget Tracker use ```React``` as the Front-End framework, implement Single Page Application (SPA) with ```React Router```, and also support page switching.
Back-End development uses the services provided by ```Firebase```, including ```Hosting``` for website deployment, ```Firestore``` as database, ```Authentication``` for building membership system and ```LocalStorage``` for storing temporary data.
The development tools used include ```Webpack``` for module bundling, ```Babel``` for resolving browser compatibility issues, ```npm``` for package management, and ```Git/GitHub``` for version control.

Budget Tracker 在前端開發的部分是選擇使用 React 建構，搭配 React Router 套件實現單頁式應用，支援頁面切換。
後端開發使用 Firebase 提供的服務平台，運用 Hosting 部屬網站、Firestore 作為資料庫、Authentication 建構會員系統，以及本地端 LocalStorage 儲存臨時數據。
開發工具使用 Webpack 進行模組的打包、Babel 解決瀏覽器相容性問題 npm 作為套件管理、Git/GitHub 進行版本控管。

![Skills Structure ](https://user-images.githubusercontent.com/101781321/227711687-ded3ea79-87a6-4df3-a0e3-23b850f32461.JPG)


## Features

### 📒 KEEPER

After logging in, users will be directed to the KEEPER page. 
Click the button at the top to add a new record. Buttons are provided after each record for users to modify or delete them. 
All data is synchronized and stored in the Firestore database. 
Users can change the month by clicking the previous and next buttons located before the date at the top.

登入後隨即跳轉到記帳頁，點選上方按鈕即可新增一筆紀錄，在每筆紀錄後方都有提供按鈕讓使用者進修改或刪除，
資料都會同步儲存在firestore資料庫中，點選上方的日期前後按鈕也可以更換月份。

![keeper](https://user-images.githubusercontent.com/101781321/224467050-25dd23cc-8ca7-4790-a96f-0df640716f4f.gif)

<br/>

### 📋 TRACKER

The TRACKER page displays all the expenses added in the KEEPER page and the income becomes a budget that is waiting to be allocated. 
Users can allocate the budget to different spending categories according to their lifestyle habits. 
When both the budget and expenses data are available, the progress bar at the bottom of the card shows the percentage of the budget used and how much money is still available to use.

預算控管頁面，在記帳頁面新增的各類支出會同步顯示在這邊，收入則會變成待分配的預算，
讓使用者可以依照生活習慣分配到各個消費類別之中，當預算和消費都有資料後，下方進度條會顯示目前已使用的%數，也可以得知目前還剩多少金額可以使用。

![tracker](https://user-images.githubusercontent.com/101781321/224467056-14977af6-06e3-4250-8f1c-038676056512.gif)

<br/>

### 📊 CHART

The CHART analysis page displays the total income, total expenses, and monthly balance for the current month at the top of the page. 
The chart section below uses the Chart.js library to implement a pie chart and a bar chart. 
Users can choose to hide any unwanted categories. Hovering over the chart displays the usage amount for each category. 
The bar chart below shows the total income and expenses for each month in the first half of the year, while the line chart shows the balance amount for each month.

圖表分析頁面，首先在最上方明顯紀錄本月的總收入/支出及月結餘，下方的圖表使用chart.js套件實作圓餅圖及長條圖，
選項可以隱藏不需要的類別，滑鼠移到圖表底下也會顯示各類別的使用金額，下方長條圖是上半年每個月的總收入/支出，折線圖是每個月結餘的金額。

![chart](https://user-images.githubusercontent.com/101781321/224467068-a63698cb-b637-4302-9fb9-fc9c318fa19a.gif)

<br/>

### 💁‍♂️ USER

On the USER page, users can modify their basic information. 
The modified data is converted to JSON format and stored in both the displayName field of Firebase Auth and the LocalStorage of the webpage. 
The reset password button is also provided. 
If the user login with Google, the red cloud picture below will display the user's profile picture set in their Google account.

最後是會員頁的部分，會員的基本資料都可以進行修改，選擇將更改的資料轉為JSON格式同時儲存在Firebase Auth的displayName和網頁的LocalStorage中，
提供重設密碼按鈕，下方紅色雲朵的部分如果是以google登入會顯示使用者在google設定的大頭貼。

![1678514199581](https://user-images.githubusercontent.com/101781321/224467790-ed646111-776a-41a0-8739-affbbef54af0.gif)

<br/>

### 📱 Responsive Web Design (RWD)

Implement a responsive design to ensure that tablet and mobile users have a better user experience.

實作響應式頁面，讓平板及手機小螢幕使用者也可以有更好的使用體驗。

![1678515746583](https://user-images.githubusercontent.com/101781321/224468839-7be88ccf-e19d-4a5a-b005-ec2c0dcae5ca.gif)

<br/>

## Contact

🙋 YOU-ZHEN, LI

📧 charlie9684@gmail.com


***  

_Thanks for your reading & have a nice day 🌞_

