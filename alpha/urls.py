from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'alpha.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    # url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'blog.views.index'),
    url(r'^index$', 'blog.views.index'),
    url(r'^writting$', 'blog.views.writting'),
    url(r'^updateDataCount$', 'blog.views.updateDataCount'),
    url(r'^passage/(?P<ID>\d{1,8})$', 'blog.views.passage'),
    url(r'^change/(?P<ID>\d{1,8})$', 'blog.views.change'),
    url(r'^saveWritting$', 'blog.views.saveWritting'),
    url(r'^savePicture$', 'blog.views.savePicture'),
    url(r'^saveComment$', 'blog.views.saveComment'),
    url(r'^saveChange/(?P<ID>\d{1,8})$', 'blog.views.saveChange'),
    url(r'^showPicture/(?P<ImgName>.*\.(jpg|png|gif|jpeg|ico)$)', 'blog.views.showPicture'),
    url(r'^showThumnail/(?P<ImgName>.*\.(jpg|png|gif|jpeg|ico)$)', 'blog.views.showThumnail'),
    url(r'^morePassage$', 'blog.views.morePassage'),
    url(r'^moreComment$', 'blog.views.moreComment'),
    url(r'^regist$', 'lnr.views.regist'),
    url(r'^login$', 'lnr.views.login'),
    url(r'^logout$', 'lnr.views.logout'),
    url(r'^getCAPTCHA', 'lnr.views.getCAPTCHA'),
)
