
from typing import List
from uagents import Context, Model, Protocol
from .inventory import ItemStock


class BuyRequest(Model):
    items: List[ItemStock]


class BuyResponse(Model):
    success: bool


order_proto = Protocol()


@order_proto.on_message(model=BuyRequest, replies=BuyResponse)
async def handle_buy_request(ctx: Context, sender: str, msg: BuyRequest):
    stock_data = ctx.storage.get("stock_data", {})
    for item in msg.items:
        if stock_data.get(item.name, 0) < item.quantity:
            await ctx.send(sender, BuyResponse(success=False))
            return
    # Reduce stock quantities
    for item in msg.items:
        stock_data[item.name] -= item.quantity
    ctx.storage.set("stock_data", stock_data)
    await ctx.send(sender, BuyResponse(success=True))
