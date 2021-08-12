using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extentions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
            .ForMember(dest => dest.PhotoUrl, options =>
            {
                options.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url);
            })
            .ForMember(dest => dest.Age, options =>
            {
                options.MapFrom(src => src.DateOfBirth.CalculateAge());
            });
            CreateMap<Photo, PhotoDto>();
        }
    }
}