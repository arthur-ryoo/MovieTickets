using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieTicketsAPI.Data;
using MovieTicketsAPI.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MovieTicketsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private MovieDbContext _dbContext;

        public MoviesController(MovieDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/<MoviesController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_dbContext.Movies);
        }

        // GET api/<MoviesController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var movie = _dbContext.Movies.Find(id);
            if (movie == null)
            {
                return NotFound("No data found with this Id");
            }
            else
            {
                return Ok(movie);
            }
        }

        [HttpGet("[action]/{id}")]
        public int Test(int id)
        {
            return id;
        }

        // POST api/<MoviesController>
        //[HttpPost]
        //public IActionResult Post([FromBody] Movie movieObj)
        //{
        //    _dbContext.Movies.Add(movieObj);
        //    _dbContext.SaveChanges();
        //    return StatusCode(StatusCodes.Status201Created);
        //}

        [HttpPost]
        public IActionResult Post([FromForm] Movie movieObj)
        {
            var guid = Guid.NewGuid();
            var filePath = Path.Combine("wwwroot", guid+".jpg");
            if (movieObj.Image != null)
            {
                var fileStream = new FileStream(filePath, FileMode.Create);
                movieObj.Image.CopyTo(fileStream);
            }
            movieObj.ImageUrl = filePath.Remove(0, 7);
            _dbContext.Movies.Add(movieObj);
            _dbContext.SaveChanges();

            return StatusCode(StatusCodes.Status201Created);
        }

        // PUT api/<MoviesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromForm] Movie movieObj)
        {
           var movie = _dbContext.Movies.Find(id);
            if (movie == null)
            {
                return NotFound("No data found with this Id");
            }
            else
            {
                var guid = Guid.NewGuid();
                var filePath = Path.Combine("wwwroot", guid + ".jpg");
                if (movieObj.Image != null)
                {
                    var fileStream = new FileStream(filePath, FileMode.Create);
                    movieObj.Image.CopyTo(fileStream);
                    movie.ImageUrl = filePath.Remove(0, 7);
                }

                movie.Name = movieObj.Name;
                movie.Language = movieObj.Language;
                movie.Rating = movieObj.Rating;
                _dbContext.SaveChanges();
                return Ok("Successfully updated data");
            }
        }

        // DELETE api/<MoviesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
          var movie = _dbContext.Movies.Find(id);
            if (movie == null)
            {
                return NotFound("No data found with this Id");
            }
            else
            {
                _dbContext.Movies.Remove(movie);
                _dbContext.SaveChanges();
                return Ok("Successfully deleted data");
            }
        }
    }
}
