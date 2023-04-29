using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model;

public class UserProject
{
    public int Id { get; private set; }
    public int IdUser { get; private set; }
    public int IdProject { get; private set; }
    public string UserType { get; private set; } = default!;
    public int AvailabilityTime { get; private set; }
    
    public User User { get; private set; } = default!;
    public Project Project { get; private set; } = default!;
}
