# Generated by Django 4.2.9 on 2024-01-12 12:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('libraries', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='library',
            name='user_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='libraries', to=settings.AUTH_USER_MODEL),
        ),
    ]
