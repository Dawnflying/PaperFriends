from django.contrib import admin
from .models import UserInfo
from .models import PaperInfo
from .models import Comment
admin.site.register(UserInfo)
admin.site.register(PaperInfo)
admin.site.register(Comment)
# Register your models here.
