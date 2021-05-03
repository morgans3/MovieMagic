using System;
using System.Collections.Generic;
using RestAPI.Dtos;
using RestAPI.Models;

namespace RestAPI.Data
{
    public interface IRestAPIRepo
    {
        Movie[] GetAllCommands();
        Movie[] GetCommandsByProperty(string property, object value);
    }
}