using MovieTicketsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieTicketsAPI.Repository.IRepository
{
    public interface IMovieRepository 
    {
        Task<Movie> GetMovie(int id);
    }
}
