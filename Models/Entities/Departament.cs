using System.Numerics;

namespace Admin.Models.Entities
{
    public class Departament
    {
        public Guid Id { get; set; }

        public required string DepartamentName { get; set; }
        public required Boolean IsActive { get; set; }
        public ICollection<Doctors> Doctors { get; set; }
        public ICollection<Appointments> Appointments { get; set; }

    }
}
