from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from pyrsistent import field
from .models import *
from bootstrap_datepicker_plus.widgets import DateTimePickerInput


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username',
                  'email', 'password1', 'password2']

    def __init__(self, *args, **kwargs):
        super(CreateUserForm, self).__init__(*args, **kwargs)

        self.fields['first_name'].widget.attrs.update(
            {'autofocus': 'autofocus', 'class': 'form-control', 'placeholder': 'First Name'})
        self.fields['last_name'].widget.attrs.update(
            {'class': 'form-control', 'placeholder': 'Last Name'})
        self.fields['username'].widget.attrs.update(
            {'class': 'form-control', 'placeholder': 'Username'})
        self.fields['email'].widget.attrs.update(
            {'class': 'form-control', 'placeholder': 'Email'})
        self.fields['password1'].widget.attrs.update(
            {'class': 'form-control', 'placeholder': 'Password'})
        self.fields['password2'].widget.attrs.update(
            {'class': 'form-control', 'placeholder': 'Confirm Password'})


class ProfileForm(ModelForm):
    class Meta:
        model = Profile
        fields = '__all__'
        exclude = ['user']

    def __init__(self, *args, **kwargs):
        super(ProfileForm, self).__init__(*args, **kwargs)
        self.fields['affiliation'].widget.attrs.update(
            {'class': 'form-control', 'placeholder': 'Affiliation'})
        self.fields['position'].widget.attrs.update(
            {'class': 'form-control', 'placeholder': 'Position'})
        self.fields['contact_no'].widget.attrs.update(
            {'class': 'form-control', 'placeholder': 'Contact Number'})


class CreateSuperUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username',
                  'email', 'password1', 'password2', 'is_superuser', 'is_staff']

    def __init__(self, *args, **kwargs):
        super(CreateSuperUserForm, self).__init__(*args, **kwargs)

        self.fields['first_name'].widget.attrs.update(
            {'autofocus': 'autofocus', 'class': 'form-control', 'placeholder': 'First Name'})
        self.fields['last_name'].widget.attrs.update(
            {'class': 'form-control', 'placeholder': 'Last Name'})
        self.fields['username'].widget.attrs.update(
            {'class': 'form-control', 'placeholder': 'Username'})
        self.fields['email'].widget.attrs.update(
            {'class': 'form-control', 'placeholder': 'Email'})
        self.fields['password1'].widget.attrs.update(
            {'class': 'form-control', 'placeholder': 'Password'})
        self.fields['password2'].widget.attrs.update(
            {'class': 'form-control', 'placeholder': 'Confirm Password'})


class AppointmentForm(ModelForm):
    class Meta:
        model = Appointment
        fields = '__all__'
        exclude = ['date_added']
        widgets = {
            'appointment_date': DateTimePickerInput()
        }

    def __init__(self, *args, **kwargs):
        super(AppointmentForm, self).__init__(*args, **kwargs)

        self.fields['patient'].widget.attrs.update(
            {'class': 'form-control', 'placeholder': 'Patient'})
        self.fields['assigned_personnel'].widget.attrs.update(
            {'class': 'form-control', 'placeholder': 'Assigned Personnel'})
        self.fields['appointment_status'].widget.attrs.update(
            {'class': 'form-control'})
        self.fields['message'].widget.attrs.update(
            {'class': 'form-control', 'placeholder': 'Message'})
        self.fields['appointment_date'].widget.attrs.update(
            {'required': 'required'})


class NoteForm(ModelForm):
    class Meta:
        model = Note
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(NoteForm, self).__init__(*args, **kwargs)

        self.fields['patient'].widget.attrs.update(
            {'class': 'form-control', 'placeholder': 'Patient'})
        self.fields['notes'].widget.attrs.update(
            {'class': 'form-control django-ckeditor-widget', })
