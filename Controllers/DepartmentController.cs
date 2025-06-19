using Admin.Data;
using Admin.Models;
using Admin.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Admin.Controllers
{
   
    [Route("/api/Departament")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly AppliactionDbContext dbContext;
        //me u conectu me database: dmth me db context
        public DepartmentController(AppliactionDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        //get api 
        [HttpGet]
        public IActionResult GetAllDepartament()
        {
            var allDepartaments = dbContext.Departaments.ToList();
            return Ok(allDepartaments);
        }
        //[HttpGet]
        //public async Task<IActionResult> GetDepartaments()
        //{
        //    var departaments = await dbContext.Departaments.ToListAsync();
        //    return Ok(departaments);
        //}

        //me e get veq 1 departament
        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetDepartamentId(Guid id)
        {
            var departamentId = dbContext.Departaments.Find(id);
            if (departamentId is null)
            {
                return NotFound();

            }
            return Ok(departamentId);
        }

        // me get countin
        [HttpGet("count")]
        public IActionResult GetDepartamentCount()
        {
            var count = dbContext.Departaments.Count();
            return Ok(count);
        }
    
        //add
        [HttpPost]
        //IActionResult-kthen rezultatet e https
        //dto -data transfer object
        public IActionResult AddDepartament(AddDepartmentDto addDepartmentDto)
        {
            bool exist = dbContext.Departaments.Any(d => d.DepartamentName.ToLower() == addDepartmentDto.DepartamentName.ToLower());
            if (exist)
            {
                ModelState.AddModelError("DepartamentName", "Departamenti me këtë emër ekziston tashmë.");
                return BadRequest(ModelState);
            }
            //me konvertu prej AddDepartmentDto  ne AddDepartment entity se spe pranonme bo add
            var departamentEntity = new Departament()
            {
                DepartamentName = addDepartmentDto.DepartamentName,
                IsActive = addDepartmentDto.IsActive,
            };

            dbContext.Departaments.Add(departamentEntity);
            dbContext.SaveChanges();
            return Ok(departamentEntity);

        }
        //uptade
        [HttpPut]
        //indentifajer shqypp
        [Route("{id:guid}")]
        public IActionResult UptadeDepartament(Guid id, UptadeDepartamentscs uptadeDepartament) 
        {
            //me e gjet spari departamentin
            var departament = dbContext.Departaments.Find(id);
          if(departament is null)
            {
                return NotFound();
            }
            //uptade qyty

            departament.DepartamentName = uptadeDepartament.DepartamentName;
            departament.IsActive = uptadeDepartament.IsActive;
            dbContext.SaveChanges();
            return Ok();
        }


        [HttpDelete]
        [Route("{id:Guid}")]
        public IActionResult DeleteDepartament(Guid id)
        {
            var departament = dbContext.Departaments.Find(id);
            if (departament is null)
            {
                return NotFound();
            }
            dbContext.Departaments.Remove(departament);
            dbContext.SaveChanges();
            return Ok();
        }


    }
}
