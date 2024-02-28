using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialApp.WebApi.Data;
using SocialApp.WebApi.Models;

namespace SocialApp.WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {

        private static List<Product> products;
        private readonly SocialContext _context;

        public ProductController(SocialContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetProducts")]
        public async Task<ActionResult> GetProducts()
        {
            var products =await  _context.Products.ToListAsync();
            return Ok(products);
        }
    }
}
