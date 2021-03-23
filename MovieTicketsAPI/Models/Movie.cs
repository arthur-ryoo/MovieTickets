using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MovieTicketsAPI.Models
{
    public class Movie
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name cannot be null or empty")]
        public string Name { get; set; }
        [Required]
        public string Language { get; set; }
        [Required]
        public double Rating { get; set; }
        [NotMapped]
        public IFormFile Image { get; set; }
        public string ImageUrl { get; set; }
    }
}
