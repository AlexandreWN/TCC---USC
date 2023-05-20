using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto;

public class TaskDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime EndDate { get; set; }
    public int DurationTime { get; set; }
    public string Status { get; set; }
    public int IdStory { get; set; }
}