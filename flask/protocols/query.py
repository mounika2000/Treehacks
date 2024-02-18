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

@query_proto.on_message(model=QueryDoctorRequest)
async def handle_query_request(ctx: Context, sender: str, msg: QueryDoctorRequest):
    # Simulated doctor availability data
    doctor_availability = DoctorAvailability(
        available=True,
        appointment_slots=[
            datetime(2024, 2, 17, 10, 0),
            datetime(2024, 2, 17, 11, 0),
            datetime(2024, 2, 17, 14, 0),
            datetime(2024, 2, 17, 15, 0),
            datetime(2024, 2, 18, 7, 0),
            datetime(2024, 2, 19, 7, 0),
            datetime(2024, 2, 20, 7, 0),
            datetime(2024, 2, 21, 7, 0),
            datetime(2024, 2, 22, 7, 0),
            datetime(2024, 2, 23, 7, 0),
            datetime(2024, 2, 24, 7, 0)
        ]
    )

    # Increment total queries count
    total_queries = int(ctx.storage.get("total_queries") or 0)
    ctx.storage.set("total_queries", total_queries + 1)

    # Log the query and availability
    ctx.logger.info(f"Query: {msg}. Doctor availability: {doctor_availability.available}.")

    # Check if requested appointment time is available
    requested_time = msg.appointment_time  # Assuming msg has a requested_time attribute
    print(requested_time)
    if requested_time in doctor_availability.appointment_slots:
        # Send confirmation email
        send_email("Appointment Confirmed", f"Your appointment is booked for {requested_time}.")
    else:
        # Inform sender to try again later
        closest_slot = min(doctor_availability.appointment_slots, key=lambda slot: abs(slot - requested_time))
        send_email("Appointment Not Available", "Please try again later for available slots. Closest slot is " + str(closest_slot))


@query_proto.on_query(model=GetTotalQueries, replies=TotalQueries)
async def handle_get_total_queries(ctx: Context, sender: str, _msg: GetTotalQueries):
    total_queries = int(ctx.storage.get("total_queries") or 0)
    await ctx.send(sender, TotalQueries(total_queries=total_queries))
