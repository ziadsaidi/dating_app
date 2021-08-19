using System;
using System.Security.Claims;

namespace API.Extentions
{
    public static  class ClaimPrincipleExtentions
    {
        public static string GetUsername(this ClaimsPrincipal user){
             return user.FindFirst(ClaimTypes.Name)?.Value;
        }
        public static int  GetUserId(this ClaimsPrincipal user){
            try{
              return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            }
            catch(Exception e){
                return -1;
            }
             
        }

        

        
    }
}