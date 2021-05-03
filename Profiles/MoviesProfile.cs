using AutoMapper;
using RestAPI.Dtos;
using RestAPI.Models;

namespace RestAPI.Profiles
{
    public class MoviesProfile : Profile
    {
        public MoviesProfile()
        {
            CreateMap<Movie, MovieReadDto>();
            CreateMap<Info, InfoReadDto>();
        }
    }
}