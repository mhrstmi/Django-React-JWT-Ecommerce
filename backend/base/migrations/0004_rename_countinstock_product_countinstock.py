# Generated by Django 4.1.4 on 2022-12-20 16:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_product_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='countInstock',
            new_name='countInStock',
        ),
    ]
