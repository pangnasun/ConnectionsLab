# Assignment 4: Working with Node Express

For this assignment, I created an api server by using data from a json file. The json file contains information about the world's forest area from 1990-2020, which I used in my first project. I 

### Journey
I started the process by finding a way to import json data into my *index.js*. After searching for answers online, I found a *File System Module* that allows me to read file and store the data in my *javascript* variable. Then I needed to use *JSON.parse()* to format it correctly. 

*Reading from json file in index.js*

![json #1](images/read_json.png)

I was struggling with differentiating between *params* and *query*, especially when it comes to deciding why using one over the other. To gain a better understaing, I searched for explanations. However, they were not very helpful. Thus, I started using and testing how they work instead. I began by using *query* because its usage seemed very straightforward, which is to search, filter, etc. I initialy used *query* to fetch forest area data based on the country name. Doing this provided all the information from 1990-2020 for that country. This made me think that it would be better to use *query* to filter data based on years and used *params* to provide information based on country name instead.

*Params & Query in index.js*

![pq #1](images/provide_data.png)

For my *javascript*, I learned to combine *params* and *query* parameters into one url. This allows me to search based on country name and filter data based on years. 
*Fetching data in app.js*

![fetch_data #1](images/fetch_data.png)
