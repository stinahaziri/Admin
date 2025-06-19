
using Admin.Models.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Admin.Models
{
    public class AddAppointmentDto
    {
        public string name { get; set; }


        public DateTime? AppointmentDate { get; set; }

        public TimeSpan? AppointmentTime { get; set; }


        public int DoctorId { get; set; }
        public Doctors? Doctor { get; set; } // Navigational dreq

        // Foreign Key për Departament
        public Guid DepartamentId { get; set; }
        public Departament? Departament { get; set; } // Navigational ih
    }
}
