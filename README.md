# weather-app
```
Assumption: 
* Assume each hour start at the top of the hour, like 1 pm.
  For example from 1 pm to 2pm, There will be 5 weather requests for each api keys. 
  Once passed 2pm, there will be new 5 weather requests available for each api keys.
* 5 API Keys
  * key1
  * key2
  * key3
  * key4
  * key5

```



1.  Buid
    1.  Unzip the weatherapp.zip
    2.  Open terminal to the local directory of weatherapp
    3.  Type "node server.js" to terminal
2.  Run
    1.  Open browser 
    2.  Type in "http://localhost:3000/"
3.  Test
    1.  URL test
        1.  Type in city,country,key with "," in between 
        2.  URL format : "http://localhost:3000/city,country,key"
        3.  Example: "http://localhost:3000/melbourne,australia,key1"
    2.  User interface test
        1.  Type in city,country,key accordingly
        2.  Example : (city: melbourne)(country: australia)(key: key1)
        2.  Press get weather description button
    
