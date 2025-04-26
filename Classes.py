# .py

class User:
    def __init__(self, username, password, permission_level):
      self.username = username
      self.id = id(self) # Not Needed When Database Added
      self.password = password
      self.permission_level = permission_level #Used to differentiate PFA and citizens



class PFA:     ##PFA Police Firefighter Ambulance
    def __init__(self, content, author, level, solved):
       self.content = content
       self.author = author 
       self.level = level #Danger Level 
       self.comments = []
       self.id = id(self) #Removed when Database added - can be used for filtering
       self.solved = solved #True Or False

    def add_reply(self, reply):
       self.reply.append(comment)

# class Reply: #Might Use
#  def __init__(self, content, author):
 #     self.content = content
  #    self.author = author #
