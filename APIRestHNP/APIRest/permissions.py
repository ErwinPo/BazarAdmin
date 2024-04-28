from rest_framework import permissions

class IsSuperuser(permissions.BasePermission):
    """
    Custom Permission to only allow superusers to access
    """
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superuser

class IsNotSuperuser(permissions.BasePermission):
    """
    Custom Permission to only allow those who are authenticated and aren't superusers
    """
    
    def has_permission(self, request, view):
        return request.user.is_authenticated