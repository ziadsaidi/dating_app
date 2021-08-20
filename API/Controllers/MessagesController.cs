using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extentions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MessagesController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMessageRepository _messageRepository;
        private readonly IMapper _mapper;

        public MessagesController(IUserRepository userRepository,
        IMessageRepository messageRepository,IMapper mapper
        )
        {   
            _userRepository = userRepository;
             _messageRepository = messageRepository;
            _mapper = mapper;
        }


      [HttpPost]
      public async Task<ActionResult<MessageDto>> AddMessage(CreateMessageDto createMessage)
      {
            var username = User.GetUsername();
            if(username == createMessage.RecipientUsername.ToLower()){
                return BadRequest("you can not send messages to yourself");
            }

            var sender = await _userRepository.GetUserByUsernameAsync(username);
            var recipient = await _userRepository.GetUserByUsernameAsync(createMessage.RecipientUsername);
            if(recipient == null) return NotFound();

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createMessage.Content

            };
            _messageRepository.AddMessage(message);
            var mappedResult = _mapper.Map<MessageDto>(message);
            if(await _messageRepository.SaveAllAsync()) return Ok(mappedResult);


            return BadRequest("cannot add message to db");

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessgesForUser([FromQuery] MessageParams messageParams){


            messageParams.Username = User.GetUsername();

            var messages = await _messageRepository.GetMessagesForUser(messageParams);
            Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize,
            messages.TotalCount, messages.TotalPages
            );

            return messages;

        }

        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string username){
            var currentUsername = User.GetUsername();

            return Ok(await _messageRepository.GetMessageThread(
                currentUsername, username
            ));


        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id){
            var username = User.GetUsername();
            var message = await _messageRepository.GetMessage(id);

           if(message.SenderUsername != username
            && message.RecipientUsername != username
           ) {
               return Unauthorized();
           }

           if(message.SenderUsername == username){
               message.SenderDeleted = true;
           }
            if(message.RecipientUsername == username){
               message.RecipientDeleted = true;
           }

           if(message.SenderDeleted && message.RecipientDeleted){
               _messageRepository.DeleteMessage(message);
           }

           if(await _messageRepository.SaveAllAsync()) return Ok();

           return BadRequest("Problem deleting the message");



        }


    }
}