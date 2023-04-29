using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model;

public class Project
{
    public int Id { get; private set; }
    public string Name { get; private set; } = default!;
    public string Description { get; private set; } = default!;
    public string UrlImage { get; private set; } = default!;
    public DateTime CreationDate { get; private set; }
}
