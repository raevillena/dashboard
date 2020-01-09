from rest_framework import serializers
from stores.models import Record, RecordData, SapSpecs, RecordBuffer


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


#Record Serializer
class SapSpecsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SapSpecs
        fields = '__all__'


#Record Serializer
class RecordBufferSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecordBuffer
        fields = '__all__'
