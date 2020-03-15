from stores.models import Record, RecordData
from rest_framework import viewsets, permissions
from .serializers import RecordSerializer, RecordDataSerializer, DistillerRecordSerializer


#Record Viewset
class RecordViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = RecordSerializer

    def get_queryset(self):
        #return self.request.user.records.all()
        queryset = self.request.user.records.all()
        batch = self.request.query_params.get('batch', None)
        q_status = self.request.query_params.get('status', None)
        if batch is not None:
            queryset = queryset.filter(recordID=batch)

        if q_status is not None:
            queryset = queryset.filter(status=q_status)
        
        return queryset
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


#RecordData Viewset
class RecordDataViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = RecordDataSerializer

    def get_queryset(self):
        #return self.request.user.recorddata.all()
        queryset = self.request.user.recorddata.all()

        #filter all according to requested batch
        batch = self.request.query_params.get('batch', None)
        if batch is not None:
            queryset = queryset.filter(recordID=batch)

        #getch only 200 out of that batch data
        count = queryset.count()
        if (count > 200):
            #filter the last 200 objects
            queryset = queryset.order_by('id')[(count - 200):]
            #queryset = queryset.reverse()[(count - 200):]
        else:
            queryset = queryset.all()
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Distillers Viewset
class DistillersViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = DistillerRecordSerializer

    def get_queryset(self):
        return self.request.user.distillers.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)