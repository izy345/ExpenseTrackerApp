from django.urls import path
from .views import * 

# <url>/Expenses/<path>
urlpatterns = [
    path('create/', createExpense, name='create-expense'),
    path('get/', getExpenses, name='get-expenses'),
    path('update/<str:pk>', updateExpense, name='update-expense'),
    path('delete/<str:pk>', deleteExpense, name='delete-expense'),
]