# Generated by Django 5.0.7 on 2024-07-21 08:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_alter_event_host_alter_event_venue'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='image',
            field=models.CharField(max_length=100, null=True),
        ),
    ]