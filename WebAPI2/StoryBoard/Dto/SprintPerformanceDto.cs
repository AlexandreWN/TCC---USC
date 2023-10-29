using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto;

public class SprintPerformanceDto
{
    public IList<DateTime> SprintDates { get; set; }
    public DateTime ActualDate { get; set; }
    public int DreamTime { get; set; }
    public int ActualTime { get; set; }
    public int RevewTime { get; set; }
}