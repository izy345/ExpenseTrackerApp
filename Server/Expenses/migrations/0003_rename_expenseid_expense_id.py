# Generated by Django 5.1.7 on 2025-03-26 18:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("Expenses", "0002_alter_expense_expenseid"),
    ]

    operations = [
        migrations.RenameField(
            model_name="expense",
            old_name="expenseId",
            new_name="id",
        ),
    ]
