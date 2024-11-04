from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import aiohttp
from pprint import pprint


app = FastAPI()
origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
def ping():
    return {"status": "OK"}


@app.get("/treasury_yields")
async def get_treasury_yields(terms: str | None, year: str | None):
    api_url = "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?filter=record_date:gte:2020-01-01"

    async with aiohttp.ClientSession() as session:
        if terms:
            api_url += f",security_desc:in:({terms})"
        if year:
            api_url += f",record_calendar_year:in:({year})"

        print(f"api_url='{api_url}'")

        async with session.get(api_url) as response:
            data = await response.json()
            print(f"data len={len(data)}")

    return data
