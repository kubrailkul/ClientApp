using System.ComponentModel.DataAnnotations;

namespace SocialApp.WebApi.Models
{
    public class Product
    {
        public long Id { get; set; }

        [Required]
        public string Name { get; set; }
        public decimal? Price { get; set; }
        public bool IsActive { get; set; }
    }
}
