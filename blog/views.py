from django.shortcuts import render_to_response

# Create your views here.
def index(request):
    username = request.session.get('username', '')
    if username == '':
        return render_to_response('index.html', {'logined':username})
    else:
        return render_to_response('index.html', {'logined':username})