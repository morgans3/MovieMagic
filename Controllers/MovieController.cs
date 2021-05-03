using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RestAPI.Data;
using RestAPI.Dtos;
using RestAPI.Models;

namespace RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private IRestAPIRepo _repository;
        private IMapper _mapper;

        public MoviesController(IRestAPIRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        [HttpGet("getall")]
        public ActionResult<IEnumerable<MovieReadDto>> GetAllCommands()
        {
            var commands = _repository.GetAllCommands();
            return Ok(_mapper.Map<IEnumerable<MovieReadDto>>(commands));
        }

        [HttpGet("getbyproperty")]
        public ActionResult<IEnumerable<MovieReadDto>> GetCommandByProperty([FromQuery] string property, [FromQuery] string value)
        {
            var command = _repository.GetCommandsByProperty(property, value);
            if (command != null)
            {
                return Ok(_mapper.Map<IEnumerable<MovieReadDto>>(command));
            }
            return NotFound();
        }
    }
}