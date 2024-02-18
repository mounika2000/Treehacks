from uagents import Agent, Context
from uagents.setup import fund_agent_if_low
from protocols.book import book_proto
from protocols.query import query_proto, DoctorAvailability

pet_clinic = Agent(
    name="pet_clinic",
    port=8001,
    seed="pet_clinic_secret_phrase",
    endpoint=["http://127.0.0.1:8001/submit"],
)
print(pet_clinic.address)
fund_agent_if_low(pet_clinic.wallet.address())

# build the pet clinic agent from stock protocols
pet_clinic.include(query_proto)
pet_clinic.include(book_proto)

if __name__ == "__main__":
    pet_clinic.run()
