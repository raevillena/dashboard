from rest_framework import routers
from .api import RecordViewSet, RecordDataViewSet

router = routers.DefaultRouter()
router.register('api/records', RecordViewSet, 'records')
router.register('api/recorddata', RecordDataViewSet, 'recorddata')
urlpatterns = router.urls