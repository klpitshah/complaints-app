def addToDatabase(s, Name, Date):
    print(s)
    s = "complainName:TweetComp, type:Water, City:Vadodara, Area:ABCD"
    string_change = s.split(',')
    final_words = [t2.split(':')[1] for t2 in string_change]
    CompName = final_words[0]
    Type = final_words[1]
    City = final_words[2]
    Area = final_words[3]
    myRecord = {
        "complainerName": "TwitterUser_" + Name, 
        "complainName": CompName, 
        "type": Type,
        "city": City,
        "area": Area,
        "complainerId":"TwitterUser_" + Name,
        "time": Date,
        "image": None,
        "assigned" : False,
        "status" : 0,
        "completed" : False
        }
    print(myRecord)
    try:
        myRecord_id = collection.insert_one(myRecord)
    except:
        print("already exists")

##################################IMPORTS############################
import tweepy
from pymongo import MongoClient 
  
try: 
    conn = MongoClient() 
    print("Connected successfully!!!") 
except:   
    print("Could not connect to MongoDB")

########################### ENTERE YOUR CREDENTIALS ######################
db = conn.the_complain_app  # database name

collection = db.complains  # collection name

############################ TWITTER APIs#############################
consumer_key = 'NIPw4HEHnY8pyxr2GI7vrfz5W'
consumer_secret = 'ozPnkDIox5obxtU0oinejnjtr6KChxjRA8dbEKLsKB5FtuvTUN'
access_token = '780618295611314177-nYN98XbbhisyAZrej4JG6JzROyMJk6O'
access_token_secret = '1eYwL5sDdzJRWlyDd802NoRgekEeaTdX1Mtbq5VGNryJF'

#########################################################################

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth,wait_on_rate_limit=True)


doneIds = set([])
tempList = []

while(True):
        for t in tweepy.Cursor(api.search,q="#myNameIsKalpit ",count=100,lang="en",since="2019-07-11").items():
                           tempList.append(t)
                           if(t.id in doneIds):
                               print("tweet already added")
                           else:
                               print("adding tweet --> " + t.text)
                               doneIds.add(t.id)
                               addToDatabase(t.text, t._json['user']['screen_name'], t.created_at)



