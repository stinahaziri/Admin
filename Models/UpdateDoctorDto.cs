using Admin.Models.Entities;

namespace Admin.Models
{
    public class UpdateDoctorDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Guid DepartmentId { get; set; }
        public IFormFile AvatarFile { get; set; }
        public TimeSpan? WorkingHoursStart { get; set; }
        public TimeSpan? WorkingHoursEnd { get; set; }
        public Departament Departament { get; set; }
    }

}
