using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        //projection approche  better performance 
        //than AutoMapper
        public async Task<MemberDto> GetMemberAsync(string username)
        {
            var user = await _context.Users
                      .Where(user => user.UserName == username)
                      .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                      .SingleOrDefaultAsync();

            return user;

        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParms)
        {
            var query = _context.Users
                    //   .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                    //   .AsNoTracking()
                      .AsQueryable();
            query = query.Where(u => u.UserName != userParms.CurrentUsername);
            query = query.Where(u => u.Gender == userParms.Gender);
            var minDob = DateTime.Today.AddYears(-userParms.MaxAge - 1);
            var maxDob =  DateTime.Today.AddYears(-userParms.MinAge);
            query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            query = userParms.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };
            
            return await PagedList<MemberDto>
             .CreateAsync(query
             .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
             .AsNoTracking(), 
             userParms.PageNumber, 
             userParms.PageSize);

        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users
            .FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
            .Include(user => user.Photos)
            .SingleOrDefaultAsync(user => user.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
            .Include(user => user.Photos)
            .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }

}