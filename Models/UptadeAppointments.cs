using Admin.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace Admin.Models
{
    public class UptadeAppointments
    {
        public string name { get; set; }

        public DateTime? AppointmentDate { get; set; }

        public TimeSpan? AppointmentTime { get; set; }

        // Foreign Key për Doctor
        public int DoctorId { get; set; }
        public Doctors? Doctor { get; set; } // Navigational dreq

        // Foreign Key për Departament
        public Guid DepartamentId { get; set; }
        public Departament? Departament { get; set; } // Navigational ih

    }
}
