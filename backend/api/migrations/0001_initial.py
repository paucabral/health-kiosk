# Generated by Django 4.0.3 on 2022-03-31 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=200)),
                ('last_name', models.CharField(max_length=200)),
                ('age', models.PositiveIntegerField()),
                ('sex', models.CharField(choices=[('MALE', 'MALE'), ('FEMALE', 'FEMALE')], max_length=6)),
                ('symptoms', models.JSONField()),
                ('contact_no', models.CharField(max_length=20)),
                ('temperature', models.FloatField(null=True)),
                ('pulse_rate', models.FloatField(null=True)),
                ('systolic_bp', models.FloatField(null=True)),
                ('diastolic_bp', models.FloatField(null=True)),
                ('o2_saturation', models.FloatField(null=True)),
                ('date_added', models.DateTimeField(auto_now_add=True, null=True)),
            ],
        ),
    ]
