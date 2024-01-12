from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegistrationSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)
  password_confirmation = serializers.CharField(write_only=True)

  class Meta:
    model = User
    fields =('id', 'name', 'email', 'password', 'password_confirmation')

  def validate(self, data):
      password = data.get('password')
      password_confirmation = data.pop('password_confirmation')

      if password != password_confirmation:
        raise serializers.ValidationError('Passwords must match.')
      return data
    
  def create(self, validated_data):
      username = validated_data.get('name')
      user = User.objects.create_user(username, **validated_data)
      return user
    