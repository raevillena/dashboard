from rest_framework import routers
from .api import RecordViewSet, RecordDataViewSet, DistillersViewSet

router = routers.DefaultRouter()
router.register('api/records', RecordViewSet, 'records')
router.register('api/recorddata', RecordDataViewSet, 'recorddata')
router.register('api/distillers', DistillersViewSet, 'distillers')
urlpatterns = router.urls