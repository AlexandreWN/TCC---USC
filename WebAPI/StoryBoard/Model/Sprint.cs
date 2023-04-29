using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model;

public class Sprint
{
    public int Id { get; private set; }
    public string Name { get; private set; } = default!;
    public string Description { get; private set; } = default!;
    public DateTime CreationDate { get; private set; }
    public DateTime InitionDate { get; private set; }
    public DateTime EndDate { get; private set; }
    public int IdProject { get; private set; }

    public Project Project { get; private set; } = default!;
}
