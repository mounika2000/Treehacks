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


conn = sqlite3.connect('example.db')
c = conn.cursor()
c.execute("SELECT * FROM records WHERE agentId='" + pet_owner.address + "'")
row = c.fetchone()
conn.close()

print(row)
doctor_query = QueryDoctorRequest(
    pet_type='dog',
    appointment_time=datetime(2024,2,18),
    appointment_duration='2',
)




@pet_owner.on_event("shutdown")
def resetComplete(ctx: Context):
    ctx.storage.set("completed", False)


@pet_owner.on_interval(period=3.0, messages=QueryDoctorRequest)
async def interval(ctx: Context):
    completed = ctx.storage.get("completed")
    if not completed:
        await ctx.send(pet_clinic_address, doctor_query)


@pet_owner.on_message(QueryDoctorResponse, replies={BookDoctorRequest})
async def handle_query_response(ctx: Context, sender: str, msg: QueryDoctorResponse):
    if msg.doctor_availability.available and len(msg.doctor_availability.appointment_slots) > 0:
        ctx.logger.info(
            "there is a free appointment slot, attempting to book now")

        appointment_time = msg.doctor_availability.appointment_slots[0]
        ctx.storage.set("completed", False)
        request = BookDoctorRequest(
            doctor="dr. smith",
            pet_type=doctor_query.pet_type,
            appointment_time=appointment_time,
            appointment_duration=doctor_query.appointment_duration,
        )

        await ctx.send(sender, request)
    else:
        ctx.logger.info("no free appointment slots - nothing more to do")
        ctx.storage.set("completed", True)


@pet_owner.on_message(BookDoctorResponse, replies=set())
async def handle_book_response(ctx: Context, _sender: str, msg: BookDoctorResponse):
    if msg.success:
        ctx.logger.info("appointment booking was successful")
    else:
        ctx.logger.info("appointment booking was unsuccessful")
    ctx.storage.set("completed", True)

if __name__ == "__main__":
    pet_owner.run()
