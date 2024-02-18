from uagents import Context, Model, Protocol
from datetime import datetime


class BookDoctorRequest(Model):
    doctor: str
    pet_type: str
    appointment_time: datetime
    appointment_duration: int


class BookDoctorResponse(Model):
    success: bool


book_proto = Protocol()


@book_proto.on_message(model=BookDoctorRequest, replies=BookDoctorResponse)
async def handle_book_request(ctx: Context, sender: str, msg: BookDoctorRequest):
    # Simulated booking logic
    success = True  # Assume booking is successful for simplicity

    # send the response
    await ctx.send(sender, BookDoctorResponse(success=success))
