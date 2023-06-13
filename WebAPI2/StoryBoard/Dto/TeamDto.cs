using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto;
public class TeamDto
{
    public int Id { get; set; }
    public string UserEmail { get; set; }
    public string UserType { get; set; }
    public int AvailabilityTime { get; set; }
    public int IdProject { get; set; }

}
