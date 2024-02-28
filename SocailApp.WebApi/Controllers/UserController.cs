using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SocialApp.WebApi.Data;
using SocialApp.WebApi.DTO;
using SocialApp.WebApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SocialApp.WebApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]    
    public class UserController : ControllerBase
    {
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        private IConfiguration _configuration;
        private readonly SocialContext _context;

        public UserController(UserManager<User> userManager,SignInManager<User> signInManager,IConfiguration configuration, SocialContext socialContext) 
        { 
            _userManager = userManager;
            _signInManager = signInManager;
            _context = socialContext;
            _configuration = configuration;
        }


        [HttpPost("register")]
        public async Task<ActionResult> Register(UserForRegisterDTO model)
        {
            var user = new User
            {
                UserName = model.UserName,  
                Email = model.Email,  
                Name= model.Name,
                Gender=model.Gender,
                Created=DateTime.Now,
                LastActive=DateTime.Now
            };

            var result=await _userManager.CreateAsync(user,model.Password);

            if(result.Succeeded)
            {
                return StatusCode(201);
            }
            return BadRequest(result);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(UserForLoginDTO model)
        {
            var user=await _context.Users.FirstAsync(x=>x.UserName==model.UserName);    
            if (user == null)
                return BadRequest(new { message="Username is incorrect" });

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

            if (result.Succeeded)
            {
                //login
                return Ok(new { 
                token=GenerateJwtToken(user)
                });
            }

            return Unauthorized(); //401
     
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Secret").Value);

            var tokenDescripter = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName)
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials=new SigningCredentials(new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha256),
            };

            var token = tokenHandler.CreateToken(tokenDescripter);

            return tokenHandler.WriteToken(token); 

        }
    }
}
