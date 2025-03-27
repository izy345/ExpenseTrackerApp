from django.db import models
import uuid

# Create your models here.
class Expense(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=False)
    
    def __str__(self):
        return f"{self.description} - {self.amount}"