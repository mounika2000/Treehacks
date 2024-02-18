from typing import List
from datetime import datetime
from uagents import Context, Model, Protocol
import smtplib
from email.message import EmailMessage


class DoctorAvailability(Model):
    available: bool
    appointment_slots: List[datetime]


class QueryDoctorRequest(Model):
    pet_type: str
    appointment_time: datetime
    appointment_duration: int


class QueryDoctorResponse(Model):
    doctor_availability: DoctorAvailability


class GetTotalQueries(Model):
    pass


class TotalQueries(Model):
    total_queries: int


query_proto = Protocol()


def send_email(subject, body):
    sender_email = "tanaygodse@gmail.com"
    receiver_email = "tanay.godse@sjsu.edu"
    password = "area epio uyqg qpcp"
    message = EmailMessage()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject if subject != "" else "Test email from Python"

    # Add body to email
    body = body if body != "" else "This is a test email sent from Python."
    message.set_content(body)

    # Connect to SMTP server
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()  # Start TLS encryption
        server.login(sender_email, password)
        server.send_message(message)
        print("Email sent successfully!")


@query_proto.on_message(model=QueryDoctorRequest, replies=QueryDoctorResponse)
async def handle_query_request(ctx: Context, sender: str, msg: QueryDoctorRequest):
    # Simulated doctor availability data
    doctor_availability = DoctorAvailability(
        available=True,
        appointment_slots=[
            datetime(2024, 2, 17, 10, 0),
            datetime(2024, 2, 17, 11, 0),
            datetime(2024, 2, 17, 14, 0),
            datetime(2024, 2, 17, 15, 0),
        ]
    )
    total_queries = int(ctx.storage.get("total_queries") or 0)
    ctx.storage.set("total_queries", total_queries + 1)

    ctx.logger.info(
        f"Query: {msg}. Doctor availability: {doctor_availability.available}.")
    await ctx.send(sender, QueryDoctorResponse(doctor_availability=doctor_availability))
    send_email("")


@query_proto.on_query(model=GetTotalQueries, replies=TotalQueries)
async def handle_get_total_queries(ctx: Context, sender: str, _msg: GetTotalQueries):
    total_queries = int(ctx.storage.get("total_queries") or 0)
    await ctx.send(sender, TotalQueries(total_queries=total_queries))
