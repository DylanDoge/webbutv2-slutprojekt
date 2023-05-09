from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import uvicorn

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:5500",
    "http://127.0.0.1",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:5500",
    "http://192.168.50.87:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes
def openJSONParser(path):
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        f.close()
    return data

@app.get("/olsen")
def greet(name = None):
    if name == None:
        text = "oh hi!"
    else:
        text = f"oh hi {name}!"
    return text

@app.get("/keyboardData")
def keyboardInfo():
    data = openJSONParser('json/keyboardVariables.json')
    return data

@app.get("/products")
def retrieveProducts(type = None):
    data = openJSONParser('json/products.json')
    if type == None:
        category = data
    elif type == "keyboards":
        category = data["keyboards"]
    elif type == "switches":
        category = data["switches"]
    else:
        category = "404 Key not found"
    
    return category

@app.get("/keyboard")
def getProductInfo(keyboard = None):
    data = openJSONParser('json/products.json')
    if keyboard == None:
        return
    if data["keyboards"][keyboard] != None:
        return data["keyboards"][keyboard]


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)