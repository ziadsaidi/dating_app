using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extentions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class LikesController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly ILikesRepository _likesRepostory;
        public LikesController(IUserRepository userRepository, ILikesRepository likesRepostory)
        {
            _likesRepostory = likesRepostory;
            _userRepository = userRepository;
        }



   [HttpPost("{username}")]
   public async Task<ActionResult> toggleLike(string username){

     // get currently logged user
       var sourceUserId = User.GetUserId();
            var isLiked = true;

            //get liked users by the currently logged user
            var likedUser = await _userRepository.GetUserByUsernameAsync(username);
     
     //get hthe cuurent logged user + the users that likes him
      var sourceUser = await _likesRepostory.GetuserWithLikes(sourceUserId);
     if(likedUser == null) return NotFound();
     if(sourceUser.UserName ==username) return BadRequest("you can not like your own profile");
     var userLike = await _likesRepostory.GetUserLike(sourceUserId,likedUser.Id);
      if(userLike != null) {
                //remove Like From LikedUser
                _likesRepostory.RemoveLike(userLike);
                isLiked = false;


            }
        else {
             userLike = new UserLike{
             SourceUserId= sourceUserId,
             LikedUserId = likedUser.Id

         };
         sourceUser.LikedUsers.Add(userLike);

        }

      
         if(await _userRepository.SaveAllAsync())return Ok((new { isLiked = isLiked}));

         return BadRequest("Failed to like or dislike user");

   }

//    [HttpPost("{username}")]
//     public async Task<ActionResult> AddLike(string username)
//     {
//    var sourceUserId = User.GetUserId();
//          var likedUser = await _userRepository.GetUserByUsernameAsync(username);
//          var sourceUser = await _likesRepostory.GetuserWithLikes(sourceUserId);
//          if(likedUser == null) return NotFound();

//          if(sourceUser.UserName ==username) return BadRequest("you can not like your own profile");

//          var userLike = await _likesRepostory.GetUserLike(sourceUserId,likedUser.Id);
//          if(userLike != null) return BadRequest("you already like this user");

//          userLike = new UserLike{
//              SourceUserId= sourceUserId,
//              LikedUserId = likedUser.Id

//          };
//          sourceUser.LikedUsers.Add(userLike);
//          if(await _userRepository.SaveAllAsync())return Ok();

//          return BadRequest("Failed to like user");


//     }

      

    [HttpGet]
    public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes( [FromQuery]LikesParams likesParams)
    {
            likesParams.UserId = User.GetUserId();
            var users = await _likesRepostory.GetUserLikes(likesParams);
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize,
            users.TotalCount, users.TotalPages);
            return Ok(users);

        }








    }
}