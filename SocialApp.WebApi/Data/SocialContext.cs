using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using SocialApp.WebApi.Models;

namespace SocialApp.WebApi.Data
{
    public class SocialContext:IdentityDbContext<User,Role,int>
    {
        public SocialContext(DbContextOptions<SocialContext> options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }

    }
}
