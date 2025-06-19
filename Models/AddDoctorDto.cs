using Admin.Models.Entities;

namespace Admin.Models
{
    public class AddDoctorDto
    {

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public Guid DepartmentId { get; set; }

        public IFormFile Avatar { get; set; }
        public TimeSpan? WorkingHoursStart { get; set; }
        public TimeSpan? WorkingHoursEnd { get; set; }
        //lidhja me departamentin

    }
}
