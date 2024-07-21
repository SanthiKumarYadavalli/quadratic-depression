from django.conf import settings
from django.core.mail import EmailMessage
import google.generativeai as genai
import requests

def get_ai_img(prompt):

    url = "https://api.limewire.com/api/image/generation"

    payload = {
    "prompt": prompt,
    "aspect_ratio": "1:1"
    }

    headers = {
    "Content-Type": "application/json",
    "X-Api-Version": "v1",
    "Accept": "application/json",
    "Authorization": "Bearer lmwr_sk_7R8Pp4eqk9_vrEQi1B9q6dm74Yw5TWT6nyRYwXdR77opz6fm"
    }
    
    print(f"### {prompt}")
    response = requests.post(url, json=payload, headers=headers)
    data = response.json()
    print(f"**********\n {data} \n\n")
    return data['data'][0]['asset_url']

def get_ai_name(prompt):

    genai.configure(api_key="AIzaSyBTTtStGblJ0t6hgUlwOiqex1lSCEWB4dQ")

    model = genai.GenerativeModel('gemini-1.5-flash')

    response = model.generate_content(prompt)
    print(prompt, response.text)
    return response.text.strip()


def send_mail(name, to, fr):
    if fr == 'register':
        subject, body = register(name)
        email = EmailMessage(subject=subject, body=body,
                             from_email=settings.EMAIL_HOST_USER, to=[to])
        email.send(fail_silently=False)
    elif fr == 'new_event':
        subject, body = EmailMessage(subject=subject, body=body, from_email=settings.EMAIL_HOST_USER, to=[to])

def new_event(name):
        subject = f"You've created a new event {name}!"
        body = f"""
        Hi {name},
        This is a confirmation that you've created a new event.
        
        We're committed to making your event planning experience seamless and enjoyable. If you have any questions or need assistance, our dedicated support team..

        Let's create something extraordinary together!

        If you have any questions or encounter any issues, please don't hesitate to contact our support team.

        Welcome aboard!

        The Quadratic Depression Team
        EVENT HORIZON
        """
        return subject, body  


def register(name):
    subject = f"Welcome to EVENT HORIZON {name}!"
    body = f"""
        Dear {name},

        Thank you for registering ! We're excited to have you join our community.

        you'll gain access to a range of powerful tools to help you:

        Event Planning and Scheduling
        Event Promotion and Registration:
        Volunteer Management
        Resource Management
        
        We're committed to making your event planning experience seamless and enjoyable. If you have any questions or need assistance, our dedicated support team..

        Let's create something extraordinary together!

        If you have any questions or encounter any issues, please don't hesitate to contact our support team.

        Welcome aboard!

        The Quadratic Depression Team
        EVENT HORIZON
"""
    return (subject, body)





