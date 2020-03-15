from django.db import models
from django.contrib.auth.models import User

class Record(models.Model):
    recordID = models.AutoField(primary_key=True, unique=True)
    start = models.CharField(max_length=50, blank=True)
    end = models.CharField(max_length=50, blank=True)
    duration = models.CharField(max_length=50, blank=True)
    output_volume = models.CharField(max_length=50, blank=True)
    status = models.CharField(max_length=10, blank=True)
    topic = models.CharField(max_length=50, blank=True)
    distillerID = models.CharField(max_length=10, blank=True)
    sap_brix = models.CharField(max_length=10, blank=True)
    sap_volume = models.CharField(max_length=10, blank=True)
    sap_origin = models.CharField(max_length=256, blank=True)
    sap_fermentation = models.CharField(max_length=10, blank=True)
    sap_date_collected = models.CharField(max_length=50, blank=True)
    owner = models.ForeignKey(
        User, related_name="records", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class RecordData(models.Model):
    recordID = models.CharField(max_length=100, unique=False)
    data = models.CharField(max_length=1000, blank=True)
    owner = models.ForeignKey(
        User, related_name="recorddata", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class DistillerRecord(models.Model):
    name = models.CharField(max_length=50, unique=True, blank=True)
    topic = models.CharField(max_length=50, unique=True, blank=True)
    capacity = models.CharField(max_length=10, blank=True)
    description = models.CharField(max_length=150, blank=True)
    owner = models.ForeignKey(
        User, related_name="distillers", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)