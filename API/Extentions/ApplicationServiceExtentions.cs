using API.Data;
using API.Helpers;
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
       
           // strongly type Settings
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            //add Custom service

            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<IUserRepository ,UserRepository>();
            services.AddAutoMapper(typeof (AutoMapperProfiles).Assembly);


            // add db Context
            services.AddDbContext<DataContext>(options =>
            {
                options.UseNpgsql(config.GetConnectionString("PostgresConnection"));

            });

            return services;

        }

    }
}