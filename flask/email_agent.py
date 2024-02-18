from uagents import Agent, Context
from uagents.setup import fund_agent_if_low
from datetime import datetime, timedelta
import smtplib
from email.message import EmailMessage

email_agent = Agent(
    name="email_agent",
    port=8004,
    seed="send daily reminder mails",
    endpoint=["http://127.0.0.1:8004/submit"],
)
fund_agent_if_low(email_agent.wallet.address())

def send_email(subject, body):
    sender_email = "tanaygodse@gmail.com"
    receiver_email = "tanay.godse@sjsu.edu"
    password = "area epio uyqg qpcp"
    message = EmailMessage()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject if subject != "" else "Test email from Python"

    # Add body to email
    if body != "":
      body = body
    else:
      "This is a test email sent from Python."
    message.set_content(body)

    # Connect to SMTP server
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()  # Start TLS encryption
        server.login(sender_email, password)
        server.send_message(message)
        print("Email sent successfully!")


@email_agent.on_interval(period=60.0)
async def interval(ctx: Context):
    now = datetime.now()
    if now.hour == 5 and now.minute == 0:
        send_email("Morning reminder walk","WALK YOUR DOG!")
        ctx.logger.info(f"in email 1")
    elif now.hour == 2 and now.minute == 3:
        send_email('Night reminder food',"FEED YOUR DOG")
        ctx.logger.info(f"in email 2")
    ctx.logger.info(f"emailers")

if __name__ == "__main__":
    email_agent.run()