from rest_framework import serializers
from stores.models import Record, RecordData


#Record Serializer
class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = '__all__'


#Record Serializer
class RecordDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecordData
        fields = '__all__'

