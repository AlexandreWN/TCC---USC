using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model;

public class Story
{
    public int Id { get; private set; }
    public string Name { get; private set; } = default!;
    public string Description { get; private set; } = default!;
    public DateTime CreationDate { get; private set; }
    public int IdSprint { get; private set; }

    public Sprint Sprint { get; private set; } = default!;
}
