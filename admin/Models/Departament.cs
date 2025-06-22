namespace Lab1.Models
{
    public class Departament
    {
        public int Id { get; set; }
        public string Name { get; set; }
      
        public string Active{ get; set; }


        public Departament(int id, string name, string location, int employeeCount, double budget)
        {
            Id = id;
            Name = name;
            Location = location;
            EmployeeCount = employeeCount;
            Budget = budget;
        }
    }
}