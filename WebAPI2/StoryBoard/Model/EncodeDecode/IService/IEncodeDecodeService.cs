using Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.EncodeDecode.IService
{
    public interface IEncodeDecodeService
    {
        public UserDto GenerateHashedUser(UserDto dto);
        public bool VerifyPassword(string password, string salt, string hashed);
    }
}
