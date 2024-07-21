from django.conf import settings
from django.core.mail import EmailMessage


def send_mail(name, to, fr):
    if fr == 'register':
        subject, body = register(name)
        email = EmailMessage(subject=subject, body=body,
                             from_email=settings.EMAIL_HOST_USER, to=[to])
        email.send(fail_silently=False)


def register(name):
    subject = f"Welcome to EVENT ORIGIN {name}!"
    body = f"""
        Dear {name},

        Thank you for registering ! We're excited to have you join our community.

        you'll gain access to a range of powerful tools to help you:
        Event Planning and Scheduling
        Event Promotion and Registration:
        Volunteer Management
        Resource Management
        
        We're committed to making your event planning experience seamless and enjoyable. If you have any questions or need assistance, our dedicated support team is here to help at [support email].

        Let's create something extraordinary together!

        If you have any questions or encounter any issues, please don't hesitate to contact our support team at [support email].

        Welcome aboard!

        Best regards,
        The Quadratic Depression Team
        EVENT ORIGIN
"""
    return (subject, body)
