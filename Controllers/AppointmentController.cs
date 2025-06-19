using Admin.Data;
using Admin.Models;
using Admin.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Admin.Controllers
{



    [Route("api/Appointment")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly AppliactionDbContext dbContext;
        public AppointmentController(AppliactionDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllAppointments()
        {
            var allAppointments = dbContext.Appointments
                .Include(a => a.Doctor)
                .Include(a => a.Departament)
                .ToList();

            return Ok(allAppointments);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetAppointments(int id)
        {
            var appointments = dbContext.Appointments.Find(id);
            if (appointments == null)
            {
                return NotFound();
            }
            return Ok(appointments);
        }

        [HttpGet("count")]
        public IActionResult GetAppointmentsCount()
        {
            var count = dbContext.Appointments.Count();
            return Ok(count);
        }

        //add
        [HttpPost]
        public IActionResult AddAppointments([FromBody] AddAppointmentDto addAppointmentDto)
        {
            bool exist = dbContext.Appointments.Any(a => a.name.ToLower() == addAppointmentDto.name.ToLower());
            if (exist)
            {
                ModelState.AddModelError("name", "appointment me kete emer egziston.");
                return BadRequest(ModelState);
            }
            //me konvertu prej AddDepartmentDto  ne AddDepartment entity se spe pranonme bo add
            var appointmentEntity = new Appointments()
            {
                name = addAppointmentDto.name,
                AppointmentDate = addAppointmentDto.AppointmentDate,
                AppointmentTime = addAppointmentDto.AppointmentTime,
                DoctorId = addAppointmentDto.DoctorId,
                DepartamentId = addAppointmentDto.DepartamentId
            };
            //Console.WriteLine(addAppointmentDto.Doctor.WorkingHoursStart?.ToString());

            dbContext.Appointments.Add(appointmentEntity);
            dbContext.SaveChanges();
            return Ok(appointmentEntity);

        }
        //uptade
        [HttpPut]
        //indentifajer shqypp
        [Route("{id:int}")]
        public IActionResult UptadeAppointments(int id, UptadeAppointments uptadeAppointments)
        {
            //me e gjet spari apartmentin
            var appointments = dbContext.Appointments.Find(id);
            if (appointments is null)
            {
                return NotFound();
            }
            //uptade qyty

            appointments.name = uptadeAppointments.name;
            appointments.AppointmentDate = uptadeAppointments.AppointmentDate;
            appointments.AppointmentTime = uptadeAppointments.AppointmentTime;
            appointments.DoctorId = uptadeAppointments.DoctorId;
            appointments.DepartamentId = uptadeAppointments.DepartamentId;





            dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult DeleteAppointments(int id)
        {
            var appointments = dbContext.Appointments.Find(id);
            if (appointments is null)
            {
                return NotFound();
            }
            dbContext.Appointments.Remove(appointments);
            dbContext.SaveChanges();
            return Ok();

        }
    } 
}
    
