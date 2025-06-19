using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Admin.Migrations
{
    /// <inheritdoc />
    public partial class AddDoctorEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.CreateTable(
            //    name: "Doctors",
            //    columns: table => new
            //    {
            //        DoctorId = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        DepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        Avatar = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        WorkingHoursStart = table.Column<TimeSpan>(type: "time", nullable: true),
            //        WorkingHoursEnd = table.Column<TimeSpan>(type: "time", nullable: true),
            //        //DepartamentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Doctors", x => x.DoctorId);
            //        table.ForeignKey(
            //            name: "FK_Doctors_Departaments_DepartmentId",
            //            column: x => x.DepartmentId,
            //            principalTable: "Departaments",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateIndex(
            //    name: "IX_Doctors_DepartmentId",
            //    table: "Doctors",
            //    column: "DepartmentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropTable(
            //    name: "Doctors");
        }
    }
}
