using Dto;
using Model.EncodeDecode.IService;
using System.Security.Cryptography;
using System.Text;

namespace Model.EncodeDecode.Service
{
    public class EncodeDecodeService: IEncodeDecodeService
    {
        public UserDto GenerateHashedUser(UserDto dto)
        {
            var salt = GenerateSalt();

            var hashedPassword = GenerateHash(dto.Password, salt);

            var data = new UserDto()
            {
                Name = dto.Name,
                Login = dto.Login,
                Password = hashedPassword,
                Salt = salt,
                Active = dto.Active,
                Adm = dto.Adm,
            };

            return data;
        }

        public bool VerifyPassword(string password, string salt, string hasedPassword)
        {
            string hashed = GenerateHash(password, salt);

            return string.Equals(hasedPassword, hashed);
        }

        private static string GenerateSalt()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();
            var salt = new string(Enumerable.Repeat(chars, 32)
                .Select(s => s[random.Next(s.Length)]).ToArray());
            return salt;
        }

        private static string GenerateHash(string password, string salt)
        {
            string passwordConc = password + salt;
            byte[] hashedBytes = SHA256.HashData(Encoding.UTF8.GetBytes(passwordConc));

            return Convert.ToBase64String(hashedBytes);
        }
    }
}
