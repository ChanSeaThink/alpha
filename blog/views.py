from django.shortcuts import render_to_response

# Create your views here.
def index(request):
    username = request.session.get('username', '')
    print '(',username,')'
    if username == '':
        print '---->1'
        return render_to_response('index.html', {'logined':username})
    else:
        print '---->2'
        return render_to_response('index.html', {'logined':username})