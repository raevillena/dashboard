from rest_framework import routers
from .api import RecordViewSet, RecordDataViewSet, SapSpecsViewSet, RecordBufferViewSet

router = routers.DefaultRouter()
router.register('api/records', RecordViewSet, 'records')
router.register('api/recorddata', RecordDataViewSet, 'recorddata')
router.register('api/sapspecs', SapSpecsViewSet, 'sapspecs')
router.register('api/recordbuffer', RecordBufferViewSet, 'recordbuffer')
urlpatterns = router.urls