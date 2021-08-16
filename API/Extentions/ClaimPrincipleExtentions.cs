using System.Security.Claims;

namespace API.Extentions
{
    public static  class ClaimPrincipleExtentions
    {
        public static string GetUsername(this ClaimsPrincipal user){
             return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
        
    }
}