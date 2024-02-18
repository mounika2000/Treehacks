
from typing import Dict, List

from uagents import Context, Model, Protocol


class ItemStock(Model):
    name: str
    quantity: int


class QueryStockRequest(Model):
    item_name: str = None


class QueryStockResponse(Model):
    stock: List[ItemStock]


class UpdateStockRequest(Model):
    items: List[ItemStock]


inventory_proto = Protocol()


@inventory_proto.on_message(model=QueryStockRequest, replies=QueryStockResponse)
async def handle_query_stock_request(ctx: Context, sender: str, msg: QueryStockRequest):
    stock_data = ctx.storage.get("stock_data") or {}
    if msg.item_name:
        stock = [ItemStock(name=msg.item_name,
                           quantity=stock_data.get(msg.item_name, 0))]
    else:
        stock = [ItemStock(name=item_name, quantity=quantity)
                 for item_name, quantity in stock_data.items()]
    await ctx.send(sender, QueryStockResponse(stock=stock))


@inventory_proto.on_message(model=UpdateStockRequest, replies=None)
async def handle_update_stock_request(ctx: Context, sender: str, msg: UpdateStockRequest):
    stock_data = ctx.storage.get("stock_data") or {}
    for item in msg.items:
        stock_data[item.name] = max(
            stock_data.get(item.name, 0) + item.quantity, 0)
    ctx.storage.set("stock_data", stock_data)
