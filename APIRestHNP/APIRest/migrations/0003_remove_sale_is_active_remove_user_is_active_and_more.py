# Generated by Django 5.0.3 on 2024-04-27 20:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('APIRest', '0002_alter_sale_user_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sale',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='user',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='user',
            name='ventas_semana',
        ),
    ]