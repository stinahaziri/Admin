using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Admin.Models.Entities
{
    public class Doctors
    {
        [Key]
        public int DoctorId { get; set; }  

        public string FirstName { get; set; }
        public string LastName { get; set; }

        [ForeignKey(nameof(Departament))]
        public Guid  DepartmentId { get; set; }  

        public string Avatar { get; set; }
        public TimeSpan? WorkingHoursStart { get; set; }
        public TimeSpan? WorkingHoursEnd { get; set; }
        //lidhja me departamentin
        //[JsonIgnore]
        public Departament Departament { get; set; } // navigational
        [NotMapped]
        public IFormFile AvatarFile { get; set; }
        public ICollection<Appointments> Appointments { get; set; }
    }
}
