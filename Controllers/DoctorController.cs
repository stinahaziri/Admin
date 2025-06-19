        using Admin.Data;
        using Admin.Models;
        using Admin.Models.Entities;
        using Microsoft.AspNetCore.Http;
        using Microsoft.AspNetCore.Mvc;
        using Microsoft.EntityFrameworkCore;
        namespace Admin.Controllers
        {
            [Route("api/Doctors")]
            [ApiController]
            public class DoctorController : ControllerBase
            {
                private readonly AppliactionDbContext dbContext;
                public DoctorController(AppliactionDbContext dbContext)
                {
                    this.dbContext = dbContext;
                }



                [HttpGet]
                public IActionResult GetAllDoctors()
                {

                    var allDoctors = dbContext.Doctors
                   .Include(d => d.Departament)
                   .ToList();  

                    return Ok(allDoctors);
                }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetDoctorById(int id)
        {

            var doctor = await dbContext.Doctors

                .Where(d => d.DoctorId == id)
                .Select(d => new
                {
                    d.DoctorId,
                    d.FirstName,    
                    d.LastName,
                    d.DepartmentId,
                    d.WorkingHoursStart,
                    d.WorkingHoursEnd,
                    d.Avatar,
                    DepartmentName = d.Departament.DepartamentName
                })
                
                .FirstOrDefaultAsync();


            if (doctor == null)
                return NotFound();

            return Ok(doctor);
        }
        [HttpPost("debug-form")]
        public IActionResult DebugForm([FromForm] UpdateDoctorDto dto)
        {
            return Ok(dto);
        }


        [HttpGet("count")]
                public IActionResult GetDoctorCount()
                {
                    var count = dbContext.Doctors.Count();
                    return Ok(count);
                }





                [HttpPost("upload-avatars")]
                public async Task<IActionResult> UploadDoctorWithAvatar([FromForm] DoctorWithAvatarUploadDto dto)
                {
                    if (dto.AvatarFile == null || dto.AvatarFile.Length == 0)
                        return BadRequest("Avatar file is required");


                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Images");
                    Directory.CreateDirectory(uploadsFolder);

                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.AvatarFile.FileName);
                    var filePath = Path.Combine(uploadsFolder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await dto.AvatarFile.CopyToAsync(stream);
                    }

                    var doctor = new Doctors
                    {
                        FirstName = dto.FirstName,
                        LastName = dto.LastName,
                        DepartmentId = dto.DepartmentId,
                        Avatar = fileName,  // Ruaj emrin e filit
                        WorkingHoursStart = dto.WorkingHoursStart,
                        WorkingHoursEnd = dto.WorkingHoursEnd
                    };

                    dbContext.Doctors.Add(doctor);
                    await dbContext.SaveChangesAsync();

                    return Ok(doctor); 
                }


                [HttpPut("update-with-avatar/{id:int}")]
                public async Task<IActionResult> UpdateDoctorWithAvatar(int id, [FromForm] UpdateDoctorDto dto)

                {
            if (!ModelState.IsValid)
            {
                foreach (var error in ModelState)
                {
                    Console.WriteLine($"{error.Key}: {string.Join(", ", error.Value.Errors.Select(e => e.ErrorMessage))}");
                }

                return BadRequest(ModelState); // kjo do e kthejë gabimin real
            }
            var doctor = await dbContext.Doctors.FindAsync(id);
                    if (doctor == null)
                        return NotFound();

                    doctor.FirstName = dto.FirstName;
                    doctor.LastName = dto.LastName;
                    doctor.DepartmentId = dto.DepartmentId;
                    doctor.WorkingHoursStart = dto.WorkingHoursStart;
                    doctor.WorkingHoursEnd = dto.WorkingHoursEnd;

                    if (dto.AvatarFile != null && dto.AvatarFile.Length > 0)
                    {
                        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Images");
                        Directory.CreateDirectory(uploadsFolder);

                        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.AvatarFile.FileName);
                        var filePath = Path.Combine(uploadsFolder, fileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await dto.AvatarFile.CopyToAsync(stream);
                        }

                        doctor.Avatar = fileName;
                    }

                    await dbContext.SaveChangesAsync();
                    return NoContent();
                }


                [HttpDelete("{id:int}")]
                public IActionResult DeleteDoctor(int id)
                {
                    var doctor = dbContext.Doctors.Find(id);
                    if (doctor == null)
                    {
                        return NotFound();
                    }
                    dbContext.Doctors.Remove(doctor);
                    dbContext.SaveChanges();
                    return NoContent();
                }

                    //[HttpPost]
                    //public async Task<IActionResult> CreateDoctor([FromForm] AddDoctorDto doctorDto, IFormFile avatar)
                    //{
                    //    // Save avatar file if provided
                    //    if (avatar != null && avatar.Length > 0)
                    //    {
                    //        var filePath = Path.Combine("wwwroot/avatars", avatar.FileName);
                    //        using (var stream = System.IO.File.Create(filePath))
                    //        {
                    //            await avatar.CopyToAsync(stream);
                    //        }

                    //        doctorDto.Avatar = "/avatars/" + avatar.FileName;
                    //    }

                    //    // save doctorDto to DB...
                    //    return Ok();
                    //}
                }
        }
