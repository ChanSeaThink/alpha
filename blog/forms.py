from django import forms

class PaswordForm(forms.Form):
    email = forms.EmailField()