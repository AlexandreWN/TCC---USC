using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto;

public class DashDto
{
    public int Id { get; private set; }
    public DateTime ActualDate { get; private set; }
    public int IdSprint { get; private set; }
    public int IdUserProject { get; private set; }
    public int DreamTime { get; private set; }
    public int ActualTime { get; private set; }
    public int RevewTime { get; private set; }
}
