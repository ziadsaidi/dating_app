using System;

namespace API.Extentions
{
    public static  class DateTimeExtentions
    {

        public static int CalculateAge(this DateTime birthDate){

            var today = DateTime.Today;
            var age = today.Year - birthDate.Year;
            if(birthDate > today.AddYears(-age)) age--;

            return age;


        }
        
    }
}