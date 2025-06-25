using System.Reflection.Emit;
using System.Text.Json.Serialization;
using Admin.Data;
using Admin.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Konfiguro DbContext
builder.Services.AddDbContext<AppliactionDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


// Konfiguro CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Shto controller-at dhe rregullo JSON për të shmangur $ref
builder.Services.AddControllers()
    .AddJsonOptions(x =>
    {
        x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        x.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

// Shto Swagger për dokumentimin e API-së
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

 builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    ContentRootPath = Directory.GetCurrentDirectory()
});

try
{
    builder.Configuration.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
}
catch (Exception ex)
{
    Console.WriteLine($"[WARNING] Failed to load appsettings.json: {ex.Message}");
}

 app = builder.Build();

// Shembull: shfaq connection string për debug
Console.WriteLine("Conn: " + builder.Configuration.GetConnectionString("DefaultConnection"));

app.Run();

// Aktivizo Static Files për folderin "Images"
app.UseStaticFiles(); // për wwwroot nëse përdoret
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Images")),
    RequestPath = "/Images"
});

// Aktivizo CORS
app.UseCors("AllowFrontendApp");




// Aktivizo Swagger vetëm në zhvillim
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication(); // nëse ke auth
app.UseAuthorization();

// Map controller-at
app.MapControllers();

app.Run();
