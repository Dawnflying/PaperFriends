
import datetime
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
    abstraction = models.CharField(max_length=500)
    src = models.CharField(max_length=200)
    users = models.ManyToManyField(UserInfo)

    def __unicode__(self):
        return u'%s' % self.title

class TagInfo(models.Model):
    tagId = models.IntegerField()
    tagContent = models.CharField(max_length=100)
    timestamp = models.DateField(default=datetime.datetime.now())
    paper = models.ForeignKey(PaperInfo, related_name="TAGS")

class Comment(models.Model):
    user = models.ForeignKey(UserInfo, related_name="MYCOMMENTS")
    timestamp = models.DateField(default=datetime.datetime.now())
    content = models.CharField(max_length=1000)
    tag = models.ForeignKey(TagInfo)
        
# Create your models here.
