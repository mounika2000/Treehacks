from protocols.book import BookDoctorRequest, BookDoctorResponse
from protocols.query import QueryDoctorRequest, QueryDoctorResponse
from uagents import Agent, Context
from uagents.setup import fund_agent_if_low
from datetime import datetime, timedelta
import os
import sqlite3


pet_clinic_address = "agent1qgaudna0253qp27dw4024c49j4ucfxgzsrhc3ldes8yrmfrqgrfnjp2r43p"

pet_owner = Agent(
    name="pet_owner",
    port=8000,
    seed="pet_owner_secret_phrase",
    endpoint=["http://127.0.0.1:8000/submit"],
)
fund_agent_if_low(pet_owner.wallet.address())


conn1 = sqlite3.connect('example.db')
c1 = conn1.cursor()
# SQL query to fetch the latest record for a specific agentId
query = """
SELECT * FROM records 
WHERE agentId='agent1qghwhyknxm46h0wsecjcunnja5tfzcyjqjz6m2pl0snmka68hytd5qnysv5' 
ORDER BY id DESC;
"""

# Execute the query
c1.execute(query)

# Fetch one record
row = c1.fetchone()
print(row)
conn1.close()

# doctor_query = QueryDoctorRequest(
#     pet_type='dog',
#     appointment_time=datetime(2024,2,18),
#     appointment_duration='2',
# )

doctor_query = QueryDoctorRequest(
    pet_type=row[1],
    appointment_time=datetime.strptime(row[2],'%Y-%m-%d %H:%M'),
    appointment_duration='2',
)




@pet_owner.on_event("shutdown")
def resetComplete(ctx: Context):
    ctx.storage.set("completed", False)


@pet_owner.on_interval(period=3.0, messages=QueryDoctorRequest)
async def interval(ctx: Context):
    await ctx.send(pet_clinic_address, doctor_query)
    os._exit(0)

if __name__ == "__main__":
    pet_owner.run()
