# Generated by Django 3.2.18 on 2023-06-07 10:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("ee", "0014_roles_memberships_and_resource_access"),
    ]

    operations = [
        migrations.AddField(
            model_name="enterprisepropertydefinition",
            name="verified",
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.AddField(
            model_name="enterprisepropertydefinition",
            name="verified_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="enterprisepropertydefinition",
            name="verified_by",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="property_verifying_user",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]