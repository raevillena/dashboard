# Generated by Django 3.0.2 on 2020-02-05 07:22

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('stores', '0002_auto_20200205_1345'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='DisitllerRecord',
            new_name='DistillerRecord',
        ),
    ]