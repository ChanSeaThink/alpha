from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect

# Create your views here.
def index(request):
    username = request.session.get('username', '')
    #print '(',username,')'
    if username == '':
        #print '---->1'
        return render_to_response('index.html', {'logined':username})
    else:
        #print '---->2'
        return render_to_response('index.html', {'logined':username, 'username':username})

def writting(request):
    username = request.session.get('username', '')
    if username == '':
        return HttpResponseRedirect('/index')
    else:
        return render_to_response('writting.html', {'username':username})
