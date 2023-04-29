using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model;

public class Task
{
    public int Id { get; private set; }
    public string Name { get; private set; } = default!;
    public string Description { get; private set; } = default!;
    public DateTime CreationDAte { get; private set; }
    public DateTime EndDate { get; private set; }
    public int DurationTime { get; private set; }
    public int IdStory { get; private set; }

    public Story Story { get; private set; } = default!;
}