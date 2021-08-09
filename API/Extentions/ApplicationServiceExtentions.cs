using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extentions
{
    public static class ApplicationServiceExtentions
    {


        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
       
            //add Custom service

            services.AddScoped<ITokenService, TokenService>();


            // add db Context
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));

            });

            return services;

        }

    }
}