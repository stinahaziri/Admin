using System.Numerics;
using Admin.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Admin.Data
{
    public class AppliactionDbContext : DbContext
    {
        public AppliactionDbContext(DbContextOptions<AppliactionDbContext>options):base (options)
        {
            
        }
        //propertie qe kena me store ne databaze
        public DbSet<Departament> Departaments{ get; set; }
        public DbSet<Doctors> Doctors { get; set; }
        public DbSet<Appointments> Appointments { get; set; }
    }
}
