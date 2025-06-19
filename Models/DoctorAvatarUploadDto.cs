namespace Admin.Models
{
    public class DoctorWithAvatarUploadDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Guid DepartmentId { get; set; }
        public TimeSpan? WorkingHoursStart { get; set; }
        public TimeSpan? WorkingHoursEnd { get; set; }
        public IFormFile AvatarFile { get; set; }
    }
}
