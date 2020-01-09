# Generated by Django 3.0.2 on 2020-01-09 10:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SapSpecs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recordID', models.CharField(max_length=100, unique=True)),
                ('sap_brix', models.CharField(blank=True, max_length=10)),
                ('sap_volume', models.CharField(blank=True, max_length=10)),
                ('sap_origin', models.CharField(blank=True, max_length=256)),
                ('sap_fermentation', models.CharField(blank=True, max_length=10)),
                ('sap_date_collected', models.CharField(blank=True, max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sapspecs', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RecordData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recordID', models.CharField(max_length=100)),
                ('data', models.CharField(blank=True, max_length=1000)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='recorddata', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RecordBuffer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.CharField(blank=True, max_length=10000)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='recordbuffer', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Record',
            fields=[
                ('recordID', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('start', models.CharField(blank=True, max_length=50)),
                ('end', models.CharField(blank=True, max_length=50)),
                ('duration', models.CharField(blank=True, max_length=50)),
                ('output_volume', models.CharField(blank=True, max_length=50)),
                ('status', models.CharField(blank=True, max_length=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='records', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
