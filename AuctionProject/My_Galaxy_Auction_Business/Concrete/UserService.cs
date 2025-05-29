using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using My_Galaxy_Auction_Business.Abstraction;
using My_Galaxy_Auction_Business.DTOs;
using My_Galaxy_Auction_Core.Models;
using My_Galaxy_Auction_Data_Access.Context;
using My_Galaxy_Auction_Data_Access.Enums;
using My_Galaxy_Auction_Data_Access.Models;

namespace My_Galaxy_Auction_Business.Concrete
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ApiResponse _response;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private string secretKey;
        public UserService(ApplicationDbContext context, IMapper mapper, ApiResponse response, UserManager<ApplicationUser> userManager, IConfiguration _configration, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _mapper = mapper;
            _response = response;
            _userManager = userManager;
            _roleManager = roleManager;
            secretKey = _configration.GetValue<string>("SecretKey:jwtKey");
        }
        public async Task<ApiResponse> Login(LoginRequestDTO model)
        {
            var userFromDb = _context.ApplicationUsers.FirstOrDefault(x => x.UserName.ToLower() == model.UserName.ToLower());
            if (userFromDb != null)
            {
                bool isValid = await _userManager.CheckPasswordAsync(userFromDb, model.Password);
                if (!isValid)
                {
                    _response.StatusCode = System.Net.HttpStatusCode.BadRequest;
                    _response.ErrorMessages.Add("Your entry informations are not correct");
                    _response.IsSuccess = false;
                    return _response;
                }

                var role = await _userManager.GetRolesAsync(userFromDb);

                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                byte[] key = Encoding.ASCII.GetBytes(secretKey);

                SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, userFromDb.Id),
                        new Claim(ClaimTypes.Email, userFromDb.Email),
                        new Claim(ClaimTypes.Role, role.FirstOrDefault()),
                        new Claim("FullName", userFromDb.FullName)
                    }),

                    Expires = DateTime.UtcNow.AddDays(15),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);


                LoginResponseModel _model = new()
                {
                    Email = userFromDb.Email,
                    Token = tokenHandler.WriteToken(token)
                };

                _response.Result = _model;
                _response.IsSuccess = true;
                _response.StatusCode = System.Net.HttpStatusCode.OK;
                return _response;
            }

            _response.StatusCode = System.Net.HttpStatusCode.BadRequest;
            _response.ErrorMessages.Add("User not found");
            _response.IsSuccess = false;
            return _response;
        }

        public async Task<ApiResponse> Register(RegisterRequestDTO model)
{
    var userFromDb = _context.ApplicationUsers.FirstOrDefault(x => x.UserName.ToLower() == model.UserName.ToLower());
    if (userFromDb != null)
    {
        _response.StatusCode = System.Net.HttpStatusCode.BadRequest;
        _response.IsSuccess = false;
        _response.ErrorMessages.Add("Username already exists");
        return _response;
    }

    // Yeni kullanıcı oluşturuluyor
    var newUser = new ApplicationUser
    {
        UserName = model.UserName,
        FullName = model.FullName,
        NormalizedEmail = model.UserName.ToUpper(),
        Email = model.UserName
    };

    var result = await _userManager.CreateAsync(newUser, model.Password);
    if (result.Succeeded)
    {
        // Rolleri kontrol et ve oluştur
        var roleExists = _roleManager.RoleExistsAsync(UserType.Administrator.ToString()).GetAwaiter().GetResult();
        if (!roleExists)
        {
            await _roleManager.CreateAsync(new IdentityRole(UserType.Administrator.ToString()));
            await _roleManager.CreateAsync(new IdentityRole(UserType.Seller.ToString()));
            await _roleManager.CreateAsync(new IdentityRole(UserType.NormalUser.ToString()));
        }

        // Kullanıcı türüne göre rol ekleme
        var userRole = model.UserType.ToString().ToLower();
        if (userRole == UserType.Administrator.ToString().ToLower())
        {
            await _userManager.AddToRoleAsync(newUser, UserType.Administrator.ToString());
        }
        else if (userRole == UserType.Seller.ToString().ToLower())
        {
            await _userManager.AddToRoleAsync(newUser, UserType.Seller.ToString());
        }
        else
        {
            await _userManager.AddToRoleAsync(newUser, UserType.NormalUser.ToString());
        }

        _response.StatusCode = System.Net.HttpStatusCode.Created;
        _response.IsSuccess = true;
        return _response;
    }

    // Hata durumunda detaylı hata mesajlarını ekle
    foreach (var error in result.Errors)
    {
        _response.ErrorMessages.Add(error.Description);  // error.ToString() yerine error.Description kullanmak daha açıklayıcıdır.
    }

    _response.StatusCode = System.Net.HttpStatusCode.BadRequest;
    _response.IsSuccess = false;
    return _response;
}

    }
}