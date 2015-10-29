

from django.db import models

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    
class UserInfo(models.Model):
    name = models.CharField(max_length=20)
    password = models.CharField(max_length=100)
    email = models.EmailField()
    direction = models.CharField(max_length=200)
    major = models.CharField(max_length=200)

class PaperInfo(models.Model):
    paperId = models.IntegerField()
    title = models.CharField(max_length=100)
    src = models.CharField(max_length=200)
    users = models.ManyToManyField(UserInfo)

class Comment(models.Model):
    users = models.ForeignKey(UserInfo)
    timestamp = models.DateField()
    content = models.CharField(max_length=1000)
    paper = models.ForeignKey(PaperInfo)
        
# Create your models here.
