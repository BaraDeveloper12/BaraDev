from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from height_estimator import estimate_height

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScanRequest(BaseModel):
    body_ratio: float

@app.get("/")
def root():
    return {"message": "Height Scanner API Running"}

@app.post("/scan")
def scan_height(data: ScanRequest):
    result = estimate_height(data.body_ratio)

    return {
        "estimated_height_cm": result,
        "confidence": 94,
        "status": "success"
    }