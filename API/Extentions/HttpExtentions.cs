using System.Text.Json;
using API.Helpers;
using Microsoft.AspNetCore.Http;

namespace API.Extentions
{
    public  static class HttpExtentions
    {

        public static void AddPaginationHeader(this HttpResponse response,
        
        int currentPage,int itemsPerPage, int totalItems,int totalPages){

            var paginationHeader = new paginationHeader(
             currentPage,
             itemsPerPage,
             totalItems,
             totalPages
            );
            var options = new JsonSerializerOptions(){
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            //custom header
            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader,options));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");

        }
        
    }
}