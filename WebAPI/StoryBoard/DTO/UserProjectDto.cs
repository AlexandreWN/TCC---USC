using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO;

public class UserProjectDto
{
    public int Id { get; set; }
    public int IdUser { get; set; }
    public int IdProject { get; set; }
    public string UserType { get; set; }
    public int AvailabilityTime { get; set; }
}
