using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;
//using System.Text.Json.Serialization;

//namespace Admin.Models.Entities
//{
//    public class Appointment
//    {
//        [Key]
//        public int AppointmentId { get; set; }
//        [ForeignKey(nameof(Doctors))]
//        public int DoctorId { get; set; }
//        [ForeignKey(nameof(Departament))]
//        [JsonPropertyName("departamentId")]
//        public Guid DepartamentId { get; set; }

//        public DateTime AppointmentDate { get; set; }
//        public string AppointmentTime { get; set; }
//        public Doctors Doctor { get; set; }
//    }
//}
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Admin.Models.Entities
{
    [Table("Appointments")]
    public class Appointments

    {
        public string name { get; set; }

        [Key]
        public int AppointmentId { get; set; }
        public DateTime? AppointmentDate { get; set; }

        public TimeSpan? AppointmentTime { get; set; }

        // Foreign Key për Doctor
        public int DoctorId { get; set; }
        public Doctors? Doctor { get; set; } // Navigational dreq

        // Foreign Key për Departament
        public Guid DepartamentId { get; set; }
        public Departament?  Departament { get; set; } // Navigational ih

    }
}
