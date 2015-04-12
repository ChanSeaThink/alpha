from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'alpha.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    # url(r'^admin/', include(admin.site.urls)),
    url(r'^index$', 'blog.views.index'),
    url(r'^writting$','blog.views.writting'),
    url(r'^regist$', 'lnr.views.regist'),
    url(r'^login$', 'lnr.views.login'),
    url(r'^logout$', 'lnr.views.logout'),
    url(r'^getCAPTCHA','lnr.views.getCAPTCHA'),
)
