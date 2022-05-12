using AuthServices.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AuthServices.Controllers
{

    [Route("api/User/")]
    public class UserController : Controller
    {
        private IUserRepository _userRepo;

        public UserController(IUserRepository userRepo)
        {
            this._userRepo = userRepo;
        }
        [HttpGet]
        [Route("Login")]
        public IActionResult Login(string username, string pasword)
        {
            #region Validate User
            bool result = this._userRepo.ValidateUser(username, pasword);
            if (!result)
            {
                return StatusCode(Convert.ToInt32(HttpStatusCode.Unauthorized), new { Message = "Invalid User." });

            }
            #endregion


            #region Generate Token
            var user = this._userRepo.GetUser(username);
            var now = DateTime.UtcNow;

            var claims = new Claim[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, now.ToUniversalTime().ToString(), ClaimValueTypes.Integer64)
            };

            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("this is the secret key to add some default jwt token, lets see how it works"));
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,
                ValidateIssuer = true,
                ValidIssuer = "dharmesh",
                ValidateAudience = true,
                ValidAudience = "enduser",
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,
                RequireExpirationTime = true,
            };

            
            var jwt = new JwtSecurityToken(
                issuer: "dharmesh",
                audience: "enduser",
                claims: claims,
                notBefore: now,
                expires: now.Add(TimeSpan.FromMinutes(60)),
                signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
            );
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            var responseJson = new
            {
                access_token = encodedJwt,
                expires_in = (int)TimeSpan.FromMinutes(2000).TotalSeconds
            };
            #endregion

            //TODO  :session store userwise for token refresh

            return StatusCode(Convert.ToInt32(HttpStatusCode.OK), new { Token = responseJson, User = new { username=user.EmailID,role=user.Role,id=user.UserID}, });


        }
    }
}
