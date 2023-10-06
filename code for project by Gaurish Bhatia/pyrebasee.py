# Name : Gaurish Bhatia
# Student ID: 222187151
# Remarks: This is the code for the implementation of the pyrebase librry to fetch and display the data onto the console in the JSON format.


# Import the Pyrebase library
import pyrebase

# Configuration object containing Firebase project credentials
config = {
  "apiKey" : "AIzaSyA3ihdn7YGt4_LPSMIgYU0Oa87p_cNUgHg",
  "authDomain": "shms-3646a.firebaseapp.com",
  "databaseURL": "https://shms-3646a-default-rtdb.firebaseio.com",
  "projectId": "shms-3646a",
  "storageBucket": "shms-3646a.appspot.com",
  "messagingSenderId": "719820678843",
  "appId": "1:719820678843:web:973f33b8f01c7fc590ab9e"
};

try:
    # Initializing the Firebase app with the provided configuration
    firebase = pyrebase.initialize_app(config)

    # a variable to the Firebase Realtime Database
    db = firebase.database()

    # Fetch data from Firebase in the sensorData collection.
    data = db.child("sensorData").get().val()

    # Checking if the data is fetched successfully, otherwire returning an error.
    if data:
        print(data)
    else:
        print("No data found.")
except Exception as e:
    print("An error occurred:", str(e))