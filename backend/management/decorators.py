from django.http import HttpResponseNotFound
from django.shortcuts import redirect


def unauthenticated_user(view_func):
    def wrapper_func(request, *args, **kwargs):

        if request.user.is_authenticated:
            if request.user.is_superuser:
                return redirect('/management/dashboard')
            return redirect('/')
        else:
            return view_func(request, *args, **kwargs)

    return wrapper_func


def admin_only():
    def decorator(view_func):
        def wrapper_func(request, *args, **kwargs):

            if request.user.is_superuser:
                return view_func(request, *args, **kwargs)
            else:
                return HttpResponseNotFound('<h1>Page not found</h1>')
        return wrapper_func
    return decorator
