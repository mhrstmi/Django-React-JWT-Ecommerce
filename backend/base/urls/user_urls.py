from django.urls import path
from ..views.user_views import *


urlpatterns = [
    path('user/', getUser, name="user"),
    path('user/update/', getUserUpdate, name="userUpdate"),
    path('register/', register, name="register"),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', getUsers, name="users"),
]