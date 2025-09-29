"""qoc_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from qoc_tool.urls import qocurls
from authentification.urls import authurls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api_auth/', include(authurls)),
    path("api_qoc/", include(qocurls)),
    #path('api_qoc/EmailVerification/', include('verify_email.urls')),
    path('api/verification/', include('verify_email.urls')),
    #path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),

]

