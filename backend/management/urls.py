from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('', views.Login.as_view(), name='login'),
    path('management/dashboard', views.AdministratorDashboard.as_view(),
         name='management-dashboard'),
    path('logout/', views.logoutUser, name='logout'),
    path('reset-password/', auth_views.PasswordResetView.as_view(
        template_name="management/reset-password.html"), name="reset_password"),
    path('reset-password-sent/', auth_views.PasswordResetDoneView.as_view(
        template_name="management/reset-password-sent.html"), name="password_reset_done"),
    path('reset-password-confirm/<uidb64>/<token>', auth_views.PasswordResetConfirmView.as_view(
        template_name="management/reset-password-confirm.html"), name="password_reset_confirm"),
    path('reset-password-complete/', auth_views.PasswordResetCompleteView.as_view(
        template_name="management/reset-password-complete.html"), name="password_reset_complete"),
    path('profile/', views.AccountProfile.as_view(), name='profile'),
    path('management/staff/', views.AdminRegisterSuperuser.as_view(),
         name='admin-staff'),
    path('staff/delete/<int:staff_id>',
         views.deleteStaff, name='delete-staff'),
    path('management/admin-profile/',
         views.AccountProfileAdmin.as_view(), name='admin-profile'),
    path('patient/records/delete/<int:patient_id>',
         views.deletePatientRecord, name='delete-patient-record'),
]