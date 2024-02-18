
from uagents import Agent, Context
from uagents.setup import fund_agent_if_low
from protocols.inventory import inventory_proto

shop = Agent(
    name="shop",
    port=8002,
    seed="shop_secret_phrase",
    endpoint=["http://127.0.0.1:8002/submit"],
)
print(shop.address)
fund_agent_if_low(shop.wallet.address())

shop.include(inventory_proto)

if __name__ == "__main__":
    shop.run()
