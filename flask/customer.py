
from protocols.order import BuyRequest, BuyResponse
from protocols.inventory import QueryStockRequest, QueryStockResponse
from uagents import Agent, Context
from uagents.setup import fund_agent_if_low

SHOP_ADDRESS = "agent1qfn76rlv7s5w4z7nmcm3cp3s5adz2whw5juwwvvylw0lp78n00zjz0q0usc"

customer = Agent(
    name="customer",
    port=8003,
    seed="customer_secret_phrase",
    endpoint=["http://127.0.0.1:8003/submit"],
)

fund_agent_if_low(customer.wallet.address())

# Define some sample queries
query_stock_all = QueryStockRequest()
query_stock_specific = QueryStockRequest(item_name="Item1")

# Send the queries


async def send_queries(ctx: Context):
    await ctx.send(SHOP_ADDRESS, query_stock_all)
    await ctx.send(SHOP_ADDRESS, query_stock_specific)

# Send queries periodically


@customer.on_interval(period=5.0, messages=QueryStockRequest)
async def interval(ctx: Context):
    await send_queries(ctx)

# Handle responses


@customer.on_message(QueryStockResponse, replies=BuyRequest)
async def handle_query_stock_response(ctx: Context, sender: str, msg: QueryStockResponse):
    # Assuming some logic for deciding what to buy based on the response
    items_to_buy = [item for item in msg.stock if item.quantity > 0]
    if items_to_buy:
        await ctx.send(sender, BuyRequest(items=items_to_buy))


@customer.on_message(BuyResponse, replies=set())
async def handle_buy_response(ctx: Context, _sender: str, msg: BuyResponse):
    if msg.success:
        ctx.logger.info("Purchase successful")
    else:
        ctx.logger.info("Purchase unsuccessful")

if __name__ == "__main__":
    customer.run()
